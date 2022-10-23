import { graphql as octokitGraphql } from '@octokit/graphql';

const graphql = octokitGraphql.defaults({
    headers: {
        authorization: `bearer ${process.env.GITHUB_TOKEN}`
    }
});

interface IOrganizationResponse {
    id: string;
    name: string;
    url: string;
    avatarUrl: string;
    repositories: {
        totalCount: number;
        pageInfo: {
            startCursor: string;
            endCursor: string;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
        nodes: IOrganizationRepository[];
    };
}

interface IOrganizationRepository {
    id: string;
    name: string;
    description?: string;
    url: string;
    stargazerCount: number;
    pullRequests: {
        totalCount: number;
        pageInfo: {
            startCursor: string;
            endCursor: string;
            hasNextPage: boolean;
            hasPreviousPage: boolean;
        };
        nodes: IPullRequest[];
    };
}

interface IPullRequest {
    title: string;
    id: string;
    url: string;
    mergedAt: string;
    mergedBy: {
        avatarUrl: string;
        url: string;
        login: string;
    };
    changedFiles: number;
    merged: boolean;
    author: {
        login: string;
        avatarUrl: string;
        url: string;
    };
}

interface IConfigProps {
    organization?: string;
    endCursor?: string;
}

function __getOrganization(config?: IConfigProps) {
    return graphql<{
        organization: IOrganizationResponse;
    }>(`{
        organization(login: "${
            config?.organization ?? process.env.ORGANIZATION
        }") {
            id
            name
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

/**
 * Gets all repositories of an organization
 */
export async function getRepositories(org?: string) {
    const { organization } = await __getOrganization({ organization: org });
    const { endCursor, hasNextPage } = organization.repositories.pageInfo;

    if (hasNextPage && endCursor) {
        while (true) {
            const { organization: res } = await __getOrganization({
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
