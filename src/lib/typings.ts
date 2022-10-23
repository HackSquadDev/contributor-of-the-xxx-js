export interface IOrganizationResponse {
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

export interface IOrganizationRepository {
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

export interface IPullRequest {
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

export interface IGetOrgProps {
    organization?: string;
    endCursor?: string;
}

export interface IContributorStats {
    author: {
        login: string;
        id: number;
        html_url: string;
        avatar_url: string;
        type: 'User' | 'Bot';
    };
    total: number;
}
