import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthSignUpDto } from './dto/auth-signUp';

@Controller('/api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  signUp(@Body(ValidationPipe) authSignUpDto: AuthSignUpDto) : Promise<void> {
    return this.authService.createUser(authSignUpDto);
  }


}
