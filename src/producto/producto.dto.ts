import { IsString, IsNumber, IsMongoId, Min, IsOptional } from 'class-validator';

export class CreateProductoDto {
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  descripcion?: string;

  @IsNumber()
  @Min(0)
  precio: number;

  @IsMongoId()
  comerciante: string;
}
