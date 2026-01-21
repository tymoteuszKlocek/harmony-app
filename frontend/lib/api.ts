const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

export class ApiClient {
  private token: string | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      this.token = localStorage.getItem("token");
    }
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem("token", token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem("token");
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Something went wrong");
    }

    return response.json();
  }

  // Auth
  async register(email: string, password: string, name?: string) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, name }),
    });
  }

  async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  async me() {
    return this.request("/auth/me");
  }

  // Checkins
  async createCheckin(data: {
    body?: string;
    mind?: string;
    relations?: string;
    nature?: string;
    mode?: string;
  }) {
    return this.request("/checkins", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getTodayCheckin() {
    return this.request("/checkins/today");
  }

  async getCheckins(from?: string, to?: string) {
    const params = new URLSearchParams();
    if (from) params.append("from", from);
    if (to) params.append("to", to);
    const query = params.toString() ? `?${params}` : "";
    return this.request(`/checkins${query}`);
  }

  // Content
  async getQuestions(mode: string = "default") {
    return this.request(`/content/questions?mode=${mode}`);
  }

  async getQuote() {
    return this.request("/content/quote");
  }
}

export const api = new ApiClient();
