import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RegisterDocument = Register & Document;

@Schema({ timestamps: true })
export class Register {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  cellphone: string;

  @Prop()
  verificationCode: string; 

  @Prop({ default: false })
  isVerified: boolean;
  
}

export const RegisterSchema = SchemaFactory.createForClass(Register);
