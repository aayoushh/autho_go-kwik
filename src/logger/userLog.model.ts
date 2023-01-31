/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class UserLog {

  @Prop()
  userID: string;

  @Prop()
  userUpdates: string;

  @Prop({ default: Date.now })
  registerTime: Date;
}

export type UserLogDocument = UserLog & Document;
export const UserLogSchema = SchemaFactory.createForClass(UserLog);
