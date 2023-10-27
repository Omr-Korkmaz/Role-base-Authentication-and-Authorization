import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayloadWithRefreshToken } from '../types';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentCustomer = createParamDecorator(
  (
    data: keyof JwtPayloadWithRefreshToken | undefined,
    context: ExecutionContext,
  ) => {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    if (data) return req.customer[data];
    return req.customer;
  },
);
