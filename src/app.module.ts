import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
//import { SignupController } from './signup/signup.controller';
//import { SignupService } from './signup/signup.service';
//import { SignupModule } from './signup/signup.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/goKwik'),
    UsersModule,
    //SignupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
