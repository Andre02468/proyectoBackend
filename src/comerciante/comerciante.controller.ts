import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ComercianteService } from './comerciante.service';
import { CreateComercianteDto } from './comerciante.dto';


@Controller('comerciante')
export class ComercianteController {
  constructor(private readonly comercianteService: ComercianteService) {}

  @Post()
  create(@Body() createDto: CreateComercianteDto) {
    return this.comercianteService.create(createDto);
  }

  @Get()
  findAll() {
    return this.comercianteService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.comercianteService.findById(id);
  }
}
