import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Comerciante, ComercianteSchema } from './schemas/comerciante.schema';
import { ComercianteService } from './comerciante.service';
import { ComercianteController } from './comerciante.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Comerciante.name, schema: ComercianteSchema }]),
  ],
  controllers: [ComercianteController],
  providers: [ComercianteService],
  exports: [ComercianteService],
})
export class ComercianteModule {}

