import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';

@Schema()
export class Cliente {

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  telefono: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  verificationCode: string; 

  @Prop({ default: false })
  isVerified: boolean;
}

export type ClienteDocument = Cliente & Document;
export const ClienteSchema = SchemaFactory.createForClass(Cliente);
