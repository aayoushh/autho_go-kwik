/* eslint-disable prettier/prettier */

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { LoggerService } from 'src/logger/logger.service';
import { UserLogSchema } from 'src/logger/userLog.model';
import { jwtConstants } from 'src/users/constants';
import { JwtStrategy } from 'src/users/jwt.strategy';
import { SignupController } from './signup.controller';
import { SignupSchema } from './signup.model';
import { SignupService } from './signup.service';

@Module({
  imports: [
    PassportModule,
    MongooseModule.forFeature([{
      name: "Signup",
      schema: SignupSchema
    }]),
    MongooseModule.forFeature([
      {
        name: 'UserLog',
        schema: UserLogSchema,
      },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '100d' },
    }),
  ],
  controllers: [SignupController],
  providers: [SignupService,
    JwtStrategy,
    SignupService,
    LoggerService,],
  exports: [SignupService]
})
export class SignupModule {}
