import { Controller, Post, Get, Param, Body, Patch } from '@nestjs/common';
import { PagoService } from './pago.service';
import { CreatePagoDto } from './pago.dto';
import { EstadoPago } from './pago.enum';


@Controller('pagos')
export class PagoController {
  constructor(private readonly pagoService: PagoService) {}

  @Post()
  create(@Body() dto: CreatePagoDto) {
    return this.pagoService.create(dto);
  }

  @Get()
  findAll() {
    return this.pagoService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.pagoService.findById(id);
  }

  @Patch(':id/estado')
  actualizarEstado(
    @Param('id') id: string,
    @Body('estado') estado: EstadoPago,
  ) {
    return this.pagoService.actualizarEstado(id, estado);
  }
}
