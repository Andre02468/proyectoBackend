import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Repartidor, RepartidorSchema } from './schemas/repartidor.schema';
import { RepartidorController } from './repartidor.controller';
import { RepartidorService } from './repartidor.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Repartidor.name, schema: RepartidorSchema }])],
  controllers: [RepartidorController],
  providers: [RepartidorService],
  exports: [RepartidorService],
})
export class RepartidorModule {}
