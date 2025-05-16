import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { RepartidorService } from './repartidor.service';
import { CreateRepartidorDto, UpdateRepartidorDto } from './repartidor.dto';

@Controller('repartidor')
export class RepartidorController {
  constructor(private readonly repartidorService: RepartidorService) {}

  @Post()
  create(@Body() createRepartidorDto: CreateRepartidorDto) {
    return this.repartidorService.create(createRepartidorDto);
  }

  @Get()
  findAll() {
    return this.repartidorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.repartidorService.findById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRepartidorDto: UpdateRepartidorDto) {
    return this.repartidorService.update(id, updateRepartidorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.repartidorService.remove(id);
  }
}
