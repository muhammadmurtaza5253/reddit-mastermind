export interface Persona {
  id: string;
  value: string;
}

export interface Subreddit {
  id: string;
  value: string;
}

export interface Query {
  id: string;
  value: string;
}

export interface FormData {
  companyInfo: string;
  personas: Persona[];
  subreddits: Subreddit[];
  queries: Query[];
  postsPerWeek: number;
}
