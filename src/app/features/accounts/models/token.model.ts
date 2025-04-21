interface Token {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

interface UserInfo {
  id: string;
  name: string;
  username: string;
  emailAddress: string;
  role: string;
}

export type { Token, UserInfo };
