import { Injectable } from '@nestjs/common';
/* eslint-disable prettier/prettier */

import { InjectModel } from '@nestjs/mongoose';
import { SignupModel } from './signup.model';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { LoggerService } from 'src/logger/logger.service';

interface User {
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}
@Injectable()
export class SignupService {
  constructor(@InjectModel('Signup') private signupModel: Model<SignupModel>,
  
  private logger: LoggerService){}

  async signup(user: User) {
    const newUser = new this.signupModel({
      username: user.username,
      email: user.email,
      firstname: user.firstname,
      lastname: user.lastname,
      password: await bcrypt.hash(user.password, 10),
    });
    try {
      await newUser.save();
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }
  
  async getUser(userName: string) {
    const username = userName;
    const user = await this.signupModel.findOne({ username });
    return user;
  }

  async removeUser(id : string) {
    return this.signupModel.findByIdAndRemove(id);
  }

  async updateUser(id: string, data: User): Promise<User> {
    this.logger.log({
      userID: id,
      userUpdates: 'updating details',
      registerTime: new Date(),
    });
    return this.signupModel.findByIdAndUpdate(id, data);
  }
}
