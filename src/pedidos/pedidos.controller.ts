import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { PedidoService } from './pedidos.service';
import { CreatePedidoDto, EstadoPedido } from './pedidos.dto';


@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  create(@Body() createPedidoDto: CreatePedidoDto) {
    return this.pedidoService.create(createPedidoDto);
  }

  @Get()
  findAll() {
    return this.pedidoService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.pedidoService.findById(id);
  }

  @Patch(':id/repartidor/:repartidorId')
  asignarRepartidor(@Param('id') pedidoId: string, @Param('repartidorId') repartidorId: string) {
    return this.pedidoService.asignarRepartidor(pedidoId, repartidorId);
  }

  @Patch(':id/estado/:estado')
  actualizarEstado(@Param('id') pedidoId: string, @Param('estado') estado: EstadoPedido) {
    return this.pedidoService.actualizarEstado(pedidoId, estado);
  }
}

