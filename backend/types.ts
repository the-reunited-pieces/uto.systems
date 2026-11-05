export interface Sysinfo {
    Fronters: string[] | null;
    Members: Member[] | null;
}

export interface Member {
    ID: string | null;
    Name: string | null;
    Display_Name: string | null;
    Description: string | null;
    Avatar_url: string | null;
    Pronouns: string | null;
}

export interface Switch {
    ID: string | null;
    Timestamp: Date | null;
    Members: Member[] | null;
}

export interface GitHubEvent {
    type: string | null;
    repo: { name: string | null; }
}

export interface Repository {
    repository: {
        name: string | null;
        url: string | null;
    }
}