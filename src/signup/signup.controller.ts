import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/users/jwt-auth.guard';
import { SignupDto } from './signup.dto';
import { SignupService } from './signup.service';
import { User } from 'src/users/users.service';

@Controller('user')
export class SignupController {
  constructor(private signupService: SignupService) {}

  @Post('/signup')
  signup(@Body() signupDto: SignupDto) {
    return this.signupService.signup(signupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.signupService.removeUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updatedData: User,
  ): Promise<User> {
    return this.signupService.updateUser(id, updatedData);
  }
}
