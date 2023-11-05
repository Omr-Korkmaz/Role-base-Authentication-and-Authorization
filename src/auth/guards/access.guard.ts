
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtPayload } from '../types';
import { Role } from '../user-role.enum';
@Injectable()
export class AccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.customer as JwtPayload;

    // Check if the role is ADMIN
    return user && user.role === "ADMIN";
}
}
