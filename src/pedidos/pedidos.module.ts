import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pedido, PedidoSchema } from './schemas/pedidos.schema';
import { PedidoController } from './pedidos.controller';
import { PedidoService } from './pedidos.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pedido.name, schema: PedidoSchema }])],
  controllers: [PedidoController],
  providers: [PedidoService],
  exports: [PedidoService],
})
export class PedidoModule {}

