export type JwtPayload = {
  email: string;
  customerId: string;
};

export type JwtPayloadWithRefreshToken = JwtPayload & { refreshToken: string };
