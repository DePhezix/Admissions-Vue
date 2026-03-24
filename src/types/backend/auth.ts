export interface userData {
    id: number | null;
    role: string | null;
    name: string | null;
    email: string | null;
}

export interface loginResponse {
  access_token: string;
  expired_at: string;
}