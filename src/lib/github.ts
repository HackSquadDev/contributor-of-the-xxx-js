import { Octokit } from '@octokit/rest';
import {
    IOrganizationResponse,
    IGetOrgProps,
    IContributorStats,
    IPRConfig,
    IContributionStats
} from './typings';
import {
    waitFor,
    MAX_CONTRIBUTION_FETCH_TRIES,
    CONTRIBUTIONS_FETCH_INTERVAL
} from './utils';

const rest = new Octokit({
    auth: process.env.GITHUB_TOKEN
});

export class GitHubAPI extends null {
    private constructor() {}

    public static getOrganization(config?: IGetOrgProps) {
        return rest.graphql<{
            organization: IOrganizationResponse;
        }>(`{
            organization(login: "${
                config?.organization ?? process.env.ORGANIZATION
            }") {
                id
                name
                login
                url
                avatarUrl
                repositories(first: 100, ${
                    config?.endCursor ? `after: "${config.endCursor}", ` : ''
                }privacy: PUBLIC, isFork: false) {
                    totalCount
                    pageInfo {
                        startCursor
                        endCursor
                        hasNextPage
                        hasPreviousPage
                    }
                    nodes {
                        id
                        name
                        description
                        url
                        stargazerCount
                    }
                }
            }
        }`);
    }

    public static async getRepositories(org?: string) {
        const { organization } = await this.getOrganization({
            organization: org
        });
        const { endCursor, hasNextPage } = organization.repositories.pageInfo;

        if (hasNextPage && endCursor) {
            while (true) {
                const { organization: res } = await this.getOrganization({
                    endCursor: organization.repositories.pageInfo.endCursor,
                    organization: org
                });
                organization.repositories.nodes.push(...res.repositories.nodes);
                organization.repositories.pageInfo = res.repositories.pageInfo;
                if (!res.repositories.pageInfo.hasNextPage) break;
            }
        }

        return organization;
    }

    public static async getContributorsFor(
        org: string,
        repo: string,
        nth = 0
    ): Promise<IContributorStats[]> {
        const data = await rest.repos.getContributorsStats({
            owner: org,
            repo
        });

        if (data.status === 202) {
            await waitFor(CONTRIBUTIONS_FETCH_INTERVAL);
            if (nth < MAX_CONTRIBUTION_FETCH_TRIES)
                return this.getContributorsFor(org, repo, nth++);
            return [];
        }

        // filter out bots
        const users = data.data.filter((u) => u.author?.type === 'User');

        return users.map((m) => ({
            author: {
                avatar_url: m.author!.avatar_url,
                html_url: m.author!.html_url,
                id: m.author!.id,
                login: m.author!.login,
                type: m.author!.type
            },
            total: m.total
        })) as IContributorStats[];
    }

    public static async getPullRequestsFor(config: IPRConfig) {
        config.org ??= process.env.ORGANIZATION;
        const res = await rest.graphql<{
            search: {
                issueCount: number;
            };
        }>(`{
            search(type:ISSUE, first: 10, query:"is:pr is:merged author:${config.author} org:${config.org}") {
                issueCount
            }
        }`);

        return res.search.issueCount;
    }

    // TODO: improve this
    public static async getContributionStats(
        organization = process.env.ORGANIZATION!
    ) {
        const org = await this.getRepositories(organization);
        const contributors = (
            await Promise.all(
                org.repositories.nodes.map((m) => {
                    return this.getContributorsFor(organization, m.name);
                })
            )
        ).flat();

        const stats: IContributionStats = {
            organization: org,
            contributions: {},
            pullRequests: {}
        };

        for (const m of contributors) {
            if (m.author.login in stats.contributions) {
                stats.contributions[m.author.login].count += m.total;
            } else {
                stats.contributions[m.author.login] = {
                    count: m.total,
                    user: m.author
                };
            }

            const prs = await this.getPullRequestsFor({
                author: m.author.login,
                org: org.login
            });

            if (m.author.login in stats.pullRequests) {
                stats.pullRequests[m.author.login].count += prs;
            } else {
                stats.pullRequests[m.author.login] = {
                    count: m.total,
                    user: m.author
                };
            }
        }

        return stats;
    }
}
