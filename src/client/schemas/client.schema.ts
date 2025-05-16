import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Cliente {
  @Prop({ required: true, unique: true })
  id: string;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  telefono: string;

  // Añade más campos según necesites, sin extender Document aquí
}

// Combinas Cliente con Document para el tipo del documento Mongoose
export type ClienteDocument = Cliente & Document;

// Creas el esquema con SchemaFactory
export const ClienteSchema = SchemaFactory.createForClass(Cliente);
