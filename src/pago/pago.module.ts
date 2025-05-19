import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Pago, PagoSchema } from './schemas/pago.schema';
import { PagoService } from './pago.service';
import { PagoController } from './pago.controller';
import { PedidoModule } from 'src/pedidos/pedidos.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: Pago.name, schema: PagoSchema }]),
  PedidoModule],
  providers: [PagoService],
  controllers: [PagoController],
})
export class PagoModule {}
