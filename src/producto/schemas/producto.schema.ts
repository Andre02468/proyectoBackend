import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Restaurante } from 'src/restaurante/schemas/restaurante.schema';

export type ProductoDocument = Producto & Document;

@Schema()
export class Producto {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop({ required: true, type: Number })
  precio: number;

  @Prop({ type: Types.ObjectId, ref: 'Restaurante' }) 
  Restaurante: Types.ObjectId;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
