
export interface UserRegisterRequest {
  name: string;
  email: string;
  pasword: string;
}

export interface LoginRequest {
  email: string;
  pasword: string;
}

export interface AuthResponse {
  token: string;
  name: string;
  userId: string;
}
