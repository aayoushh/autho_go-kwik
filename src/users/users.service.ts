import { Injectable, NotAcceptableException } from '@nestjs/common';
import { SignupService } from 'src/signup/signup.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoggerService } from 'src/logger/logger.service';

export type User = {
  username: string;
  firstname: string;
  email: string;
  lastname: string;
  password: string;
};

@Injectable()
export class UsersService {
  constructor(
    private readonly signupService: SignupService,
    private jwtService: JwtService,
    private logger: LoggerService,
  ) {}
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.signupService.getUser(username);
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!user) {
      throw new NotAcceptableException('could not find the user');
    }
    if (user && passwordValid) {
      return {
        userId: user.id,
        userName: user.username,
      };
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };

    this.logger.log({
      userID: user.id,
      userUpdates: 'login',
      registerTime: new Date(),
    });

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
