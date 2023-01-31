import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import { LocalAuthGuard } from './local.auth.guard';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}

  //Post / Login
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req) {
    return this.userService.login(req.user);
  }
}
