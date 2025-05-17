import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductoDocument = Producto & Document;

@Schema()
export class Producto {
  @Prop({ required: true })
  nombre: string;

  @Prop()
  descripcion: string;

  @Prop({ required: true, type: Number })
  precio: number;

  @Prop({ type: String, ref: 'Comerciante' }) // Relación
  comerciante: string;
}

export const ProductoSchema = SchemaFactory.createForClass(Producto);
