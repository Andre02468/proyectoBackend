import { IsString } from 'class-validator';

export class CreateRestauranteDto {
  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;
}
