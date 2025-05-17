import {IsArray, IsEnum, IsMongoId, IsNumber, IsString, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductoPedidoDto {
  @IsString()
  nombre: string;

  @IsNumber()
  @Min(1)
  cantidad: number;
}

export enum EstadoPedido {
  PENDIENTE = 'pendiente',
  ACEPTADO = 'aceptado',
  EN_CAMINO = 'en_camino',
  ENTREGADO = 'entregado',
  CANCELADO = 'cancelado',
}

export class CreatePedidoDto {
  @IsMongoId()
  cliente: string;

  @IsMongoId()
  restaurante: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductoPedidoDto)
  productos: ProductoPedidoDto[];

  @IsNumber()
  total: number;

  @IsEnum(EstadoPedido)
  estado: EstadoPedido;
}
