export interface UserSearchResponse {
    incomplete_results: boolean,
    items: Array<UserInfo>,
    total_count: number
}

export interface UserInfo {
    avatar_url: string,
    events_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    gravatar_id: string,
    html_url: string,
    id: number,
    login: string,
    node_id: string,
    organizations_url: string,
    received_events_url: string,
    repos_url: string,
    score: number,
    site_admin: boolean,
    starred_url: string,
    subscriptions_url: string,
    type: string,
    url: string,
}

export interface UserDetailResponse {
    message?: string,
    documentation_url?: string,
    avatar_url?: string,
    bio?: string,
    blog?: string,
    company?: string,
    created_at?: string,
    email?: string,
    events_url?: string,
    followers?: 23
    followers_url?: string,
    following?: 3
    following_url?: string,
    gists_url?: string,
    gravatar_id?: string,
    hireable?: string,
    html_url?: string,
    id?: number,
    location?: string,
    login?: string,
    name?: string,
    node_id?: string,
    organizations_url?: string,
    public_gists?: number,
    public_repos?: number,
    received_events_url?: string,
    repos_url?: string,
    site_admin?: boolean,
    starred_url?: string,
    subscriptions_url?: string,
    twitter_username?: string,
    type?: string,
    updated_at?: string,
    url?: string
}