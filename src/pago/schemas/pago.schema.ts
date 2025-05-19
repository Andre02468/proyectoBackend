import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EstadoPago, MetodoPago } from '../pago.enum';


@Schema()
export class Pago extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Pedido', required: true })
  pedido: Types.ObjectId;

  @Prop({ required: true })
  monto: number;

  @Prop({ required: true, enum: MetodoPago })
  metodo: MetodoPago;

  @Prop({ required: true, enum: EstadoPago, default: EstadoPago.PENDIENTE })
  estado: EstadoPago;
}

export const PagoSchema = SchemaFactory.createForClass(Pago);
