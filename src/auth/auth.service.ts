import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { SignUpInput } from './dto/signup-input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { LoginInput } from './dto/login-input';
import { generateVerificationCode } from 'src/utils/crypto';
import { SignResponse } from './dto/sign-response';
// import { UserRole } from 'src/lib/entities/customer.entity';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}


  // isSuperAdmin(email: string): boolean {
  //   return email === 'omer@gmail.com'; // Replace with the actual super admin email
  // }





  async signup(signUpInput: SignUpInput): Promise<SignResponse> {
    const hashedPassword =  await argon.hash(signUpInput.password);

    const verificationCode = generateVerificationCode();

    const customer = await this.prisma.customer.create({
      data: {
        email: signUpInput.email,
        username: signUpInput.username,
        password: hashedPassword,
        // role: UserRole.USER, // Set the default role for a new customer
        verificationCode: verificationCode,
      },
    });

    // sendVerificationCodeByEmail(customer.email, verificationCode);


    return {
      accessToken: 'yourAccessToken',
      refreshToken: 'yourRefreshToken',
      customer: customer,
      verificationCode: verificationCode

    };
  }

  async verifyAccount(email: string, verificationCode: string): Promise<boolean> {
    const customer = await this.prisma.customer.findUnique({
      where: { email },
    });

    if (customer && customer.verificationCode === verificationCode) {

      await this.prisma.customer.update({
        where: { email },
        data: { isVerified: true },
      });

      return true;
    }

    return false;
  }

  



  async login(loginInput: LoginInput) {
    const customer = await this.prisma.customer.findUnique({
      where: { email: loginInput.email },
    });

    if (!customer) {
      throw new ForbiddenException('Access Denied');
    }

    const doPasswordsMatch = await argon.verify(
      customer.password,
      loginInput.password,
    );

    if (!doPasswordsMatch) {
      throw new ForbiddenException('Access Denied');
    }

    if (customer.verificationCode !== loginInput.verificationCode) {
      throw new ForbiddenException('Access Denied');
    }
  

    const { accessToken, refreshToken } = await this.createTokens(
      customer.id,
      customer.email,
    );

    await this.updateRefreshToken(customer.id, refreshToken);

    return { accessToken, refreshToken, customer };
  }

  findOne(id: string) {
    return `This action returns a #${id} auth`;
  }

  update(id: string, updateAuthInput: UpdateAuthInput) {
    return `This action updates a #${id} auth`;
  }

  remove(id: string) {
    return `This action removes a #${id} auth`;
  }

  async createTokens(customerId: string, email: string) {
    const accessToken = this.jwtService.sign(
      {
        customerId,
        email,
      },
      {
        expiresIn: '1h',
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      },
    );
    const refreshToken = this.jwtService.sign(
      {
        customerId,
        email,
        accessToken,
      },
      {
        expiresIn: '1d',
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      },
    );
    return { accessToken, refreshToken };
  }
  async updateRefreshToken(customerId: string, refreshToken: string) {
    const hashedRefreshToken = await argon.hash(refreshToken);
    await this.prisma.customer.update({
      where: { id: customerId },
      data: { hashedRefreshToken },
    });
  }

  async logout(customerId: string) {
    await this.prisma.customer.updateMany({
      where: { id: customerId, hashedRefreshToken: { not: null } },
      data: { hashedRefreshToken: null },
    });
    return { loggedOut: true };
  }

  async getNewTokens(customerId: string, rt: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId },
    });
    if (!customer) {
      throw new ForbiddenException('Access Denied');
    }
    const doRefreshTokensMatch = await argon.verify(
      customer.hashedRefreshToken,
      rt,
    );
    if (!doRefreshTokensMatch) {
      throw new ForbiddenException('Access Denied');
    }
    const { accessToken, refreshToken } = await this.createTokens(
      customer.id,
      customer.email,
    );
    await this.updateRefreshToken(customer.id, refreshToken);
    return { accessToken, refreshToken, customer };
  }
}
