import { PrismaService } from '../prisma.service';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { AccessGuard } from './guards/access.guard';  // Import the AccessGuard

@Module({
  providers: [
    AuthResolver,
    AuthService,
    JwtService,
    PrismaService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AccessGuard,
  ],
})
export class AuthModule {}
