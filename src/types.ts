// types.ts
export interface Link {
    to: string;
    label: string;
}

export interface Links {
    internal: Link[];
    social: Link[];
}
