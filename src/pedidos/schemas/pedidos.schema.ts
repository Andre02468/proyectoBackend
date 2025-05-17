import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { EstadoPedido } from '../pedidos.dto';


export type PedidoDocument = Pedido & Document;

@Schema()
export class ProductoPedido {
  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true })
  cantidad: number;
}

@Schema({ timestamps: true })
export class Pedido {
  @Prop({ type: Types.ObjectId, ref: 'Cliente', required: true })
  cliente: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Comerciante', required: true })
  comerciante: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Repartidor', default: null })
  repartidor?: Types.ObjectId;

  @Prop({ type: [Object], required: true })
  productos: ProductoPedido[];

  @Prop({ enum: EstadoPedido, default: EstadoPedido.PENDIENTE })
  estado: EstadoPedido;

  @Prop({ required: true })
  total: number;
}

export const PedidoSchema = SchemaFactory.createForClass(Pedido);
