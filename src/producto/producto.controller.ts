import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { ProductoService } from './producto.service';
import { CreateProductoDto } from './producto.dto';

@Controller('productos')
export class ProductoController {
  constructor(private readonly productoService: ProductoService) {}

  @Post()
  create(@Body() dto: CreateProductoDto) {
    return this.productoService.create(dto);
  }

  @Get()
  findAll() {
    return this.productoService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.productoService.findById(id);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productoService.delete(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<CreateProductoDto>) {
    return this.productoService.update(id, data);
  }
}
