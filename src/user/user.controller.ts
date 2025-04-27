import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/info')
  @UseGuards(JwtAuthGuard)
  getUserInfo(@Req() req: any) {
    return this.userService.getUserInfo(req.user);
  }

}
