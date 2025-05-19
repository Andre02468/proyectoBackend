import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { RestauranteService } from './restaurante.service';
import { CreateRestauranteDto } from './restaurante.dto';


@Controller('restaurantes')
export class RestauranteController {
  constructor(private readonly restauranteService: RestauranteService) {}

  @Post()
  create(@Body() dto: CreateRestauranteDto) {
    return this.restauranteService.create(dto);
  }

  @Get()
  findAll() {
    return this.restauranteService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.restauranteService.findById(id);
  }

  @Post(':id/confirmar-pedido')
  confirmarPedido(@Param('id') id: string) {
    return this.restauranteService.confirmarPedido(id);
  }
}
