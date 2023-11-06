
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { SignUpInput } from './dto/signup-input';
import { SignResponse } from './dto/sign-response';
import { LoginInput } from './dto/login-input';
import { LogoutResponse } from './dto/logout-response';
import { Public } from './decorators/public.decorator';

import { UseGuards } from '@nestjs/common';


@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}


  @Public()
  @Mutation(() => SignResponse)
  async signup(
    @Args('signUpInput') signUpInput: SignUpInput,
  ): Promise<SignResponse> {
    return this.authService.signup(signUpInput);
  }

  @Mutation(() => Boolean)
  async verifyAccount(
    @Args('email') email: string,
    @Args('verificationCode') verificationCode: string,
  ): Promise<boolean> {
    return this.authService.verifyAccount(email, verificationCode);
  }

  @Public()
  @Mutation(() => SignResponse)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }




  // @UseGuards(RefreshTokenGuard)

  @Mutation(() => LogoutResponse)
  logout(@Args('id') id: string) {
    return this.authService.logout(id);
  }

}
