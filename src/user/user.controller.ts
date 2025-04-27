import { Body, Controller, Get, Put, Req, UseGuards, ValidationPipe } from '@nestjs/common';

import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { UserUpdateDto } from './dto/user-update';
import { UserPasswordDto } from './dto/user-password';

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/info')
  @UseGuards(JwtAuthGuard)
  getUserInfo(@Req() req: any) {
    return this.userService.getUserInfo(req.user);
  }

  @Put('/info')
  @UseGuards(JwtAuthGuard)
  updateUserInfo(@Req() req: any, @Body(ValidationPipe) userUpdateDto: UserUpdateDto) {
    return this.userService.updateUserInfo(req.user, userUpdateDto);
  }

  @Put('/password')
  @UseGuards(JwtAuthGuard)
  updatePassword(@Req() req: any, @Body(ValidationPipe) userPasswordDto: UserPasswordDto) {
    return this.userService.updatePassword(req.user, userPasswordDto);
  }

}
