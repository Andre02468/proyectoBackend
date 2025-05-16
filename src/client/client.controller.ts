import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ClienteService } from './client.service';
import { CreateClienteDto } from './client.dto';


@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  createCliente(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  /*@Get(':id/historial')
  getHistorialPedidos(@Param('id') id: string) {
    return this.clienteService.getHistorialPedidos(id);
  }*/
}
