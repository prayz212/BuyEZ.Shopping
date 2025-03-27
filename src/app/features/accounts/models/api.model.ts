/*  Request models  */
interface SignInRequest {
  username: string;
  password: string;
}

interface SignUpRequest {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
}

/*  Response models  */
interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
  scope: string;
}

interface UserDetailResponse {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
}

export type { SignInRequest, SignUpRequest, TokenResponse, UserDetailResponse };
