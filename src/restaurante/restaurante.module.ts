import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Restaurante, RestauranteSchema } from './schemas/restaurante.schema';
import { RestauranteService } from './restaurante.service';
import { RestauranteController } from './restaurante.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurante.name, schema: RestauranteSchema },
    ]),
  ],
  controllers: [RestauranteController],
  providers: [RestauranteService],
})
export class RestauranteModule {}
