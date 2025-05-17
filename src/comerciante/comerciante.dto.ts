import { IsEmail, IsString, IsPhoneNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductoDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsString()
  precio: string;
}

export class CreateComercianteDto {
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('CO')
  telefono: string;

  @IsString()
  direccion: string;

  @ValidateNested({ each: true })
  @Type(() => ProductoDto)
  productos: ProductoDto[];
}
