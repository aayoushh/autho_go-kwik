import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport/dist';
import { LoggerService } from 'src/logger/logger.service';
import { UserLogSchema } from 'src/logger/userLog.model';
import { SignupSchema } from 'src/signup/signup.model';
import { SignupService } from 'src/signup/signup.service';
import { SignupModule } from 'src/signup/signup.module';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    SignupModule,
    PassportModule,
    MongooseModule.forFeature([
      {
        name: 'Signup',
        schema: SignupSchema,
      },
    ]),
    MongooseModule.forFeature([
      {
        name: 'UserLog',
        schema: UserLogSchema,
      },
    ]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '100s' },
    }),
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    LocalStrategy,
    JwtStrategy,
    SignupService,
    LoggerService,
    SignupService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
