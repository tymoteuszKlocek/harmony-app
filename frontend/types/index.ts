export interface User {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}

export interface Checkin {
  id: string;
  userId: string;
  date: string;
  body?: string;
  mind?: string;
  relations?: string;
  nature?: string;
  mode: string;
  createdAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}