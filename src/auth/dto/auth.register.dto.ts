import { IsEmail, IsEnum, IsString, IsPhoneNumber, IsUUID } from 'class-validator';

export enum TipoUsuario {
  CLIENTE = 'cliente',
  REPARTIDOR = 'repartidor',
  COMERCIO = 'comercio',
}

export class RegisterDto {
  @IsUUID()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsString()
  readonly password: string;

  @IsEmail()
  readonly email: string;

  @IsPhoneNumber("CO", { message: 'Número de teléfono inválido' })
  readonly cellphone: string;

  @IsEnum(TipoUsuario, {
    message: 'tipoUsuario debe ser uno de: cliente, repartidor, comercio',
  })
  readonly userType: TipoUsuario;
}
