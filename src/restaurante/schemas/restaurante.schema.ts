import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Restaurante extends Document {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Producto' }] })
  productos: Types.ObjectId[]; 
}

export const RestauranteSchema = SchemaFactory.createForClass(Restaurante);
