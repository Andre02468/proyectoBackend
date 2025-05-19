import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pedido, PedidoSchema } from './schemas/pedidos.schema';
import { PedidoController } from './pedidos.controller';
import { PedidoService } from './pedidos.service';
import { ProductoModule } from 'src/producto/producto.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pedido.name, schema: PedidoSchema }]),
    ProductoModule 
  ],
  
  controllers: [PedidoController],
  providers: [PedidoService],
  exports: [PedidoService],
})
export class PedidoModule {}

