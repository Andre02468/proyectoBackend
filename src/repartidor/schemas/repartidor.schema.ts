import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RepartidorDocument = Repartidor & Document;

@Schema()
export class Repartidor {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  telefono: string;

  @Prop()
  vehiculo: string;

  @Prop({ default: false })
  disponible: boolean;
}

export const RepartidorSchema = SchemaFactory.createForClass(Repartidor);
