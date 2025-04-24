import { Body, Controller, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto/auth-signUp';
import { AuthLoginDto } from './dto/auth-login';
import { JwtAuthGuard } from './jwt.guard';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  signUp(@Body(ValidationPipe) authSignUpDto: AuthSignUpDto) : Promise<void> {
    return this.authService.createUser(authSignUpDto);
  }

  @Post('/login')
  login(@Body(ValidationPipe) authLoginDto: AuthLoginDto) : Promise<{accessToken: string}> {
    return this.authService.loginUser(authLoginDto);
  }
}
