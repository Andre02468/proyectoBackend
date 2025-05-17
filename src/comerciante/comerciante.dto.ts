import { IsEmail, IsString, IsPhoneNumber, ValidateNested } from 'class-validator';

export class CreateComercianteDto {
  @IsString()
  nombre: string;

  @IsEmail()
  email: string;

  @IsPhoneNumber('CO')
  telefono: string;

  @IsString()
  direccion: string;
}

