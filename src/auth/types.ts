export type JwtPayload = {
  email: string;
  customerId: string;
  role:string
};

export type JwtPayloadWithRefreshToken = JwtPayload & { refreshToken: string };