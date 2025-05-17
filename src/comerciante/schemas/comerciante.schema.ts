import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ComercianteDocument = Comerciante & Document;

@Schema()
export class Producto {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  descripcion: string;

  @Prop({ required: true })
  precio: string;
}

@Schema()
export class Comerciante {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  telefono: string;

  @Prop({ required: true })
  direccion: string;

  @Prop({ type: [Object], default: [] })
  productos: Producto[];
}

export const ComercianteSchema = SchemaFactory.createForClass(Comerciante);
