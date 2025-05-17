import { IsEnum, IsMongoId, IsNumber } from 'class-validator';
import { EstadoPago, MetodoPago } from './pago.enum';


export class CreatePagoDto {
  @IsMongoId()
  pedido: string;

  @IsNumber()
  monto: number;

  @IsEnum(MetodoPago)
  metodo: MetodoPago;

  @IsEnum(EstadoPago)
  estado: EstadoPago;
}
