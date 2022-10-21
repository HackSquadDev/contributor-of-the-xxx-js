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

// TODO
export function getRepositories() {
    return graphql<IOrganizationResponse>(`{
        organization(login: "${process.env.ORGANIZATION}") {
            id
            name
            url
            avatarUrl
            repositories(first: 100, privacy: PUBLIC, isFork: false) {
                nodes {
                    id
                    name
                    description
                    url
                    stargazerCount
                    pullRequests(states: MERGED, first: 100) {
                        nodes {
                            title
                            id
                            url
                            mergedAt
                            mergedBy {
                                avatarUrl
                                url
                                login
                            }
                            changedFiles
                            merged
                            author {
                                login
                                avatarUrl
                                url
                            }
                        }
                    }
                }
            }
        }
    }`);
}
