import { IsBoolean, IsOptional, IsString, IsUUID, IsPhoneNumber } from 'class-validator';

export class CreateRepartidorDto {
  @IsUUID()
  readonly id: string;

  @IsString()
  readonly nombre: string;

  @IsPhoneNumber('CO', { message: 'Número de teléfono inválido' })
  readonly telefono: string;

  @IsOptional()
  @IsString()
  readonly vehiculo?: string;

  @IsOptional()
  @IsBoolean()
  readonly disponible?: boolean;
}

export class UpdateRepartidorDto {
  @IsOptional()
  @IsString()
  readonly nombre?: string;

  @IsOptional()
  @IsPhoneNumber('CO', { message: 'Número de teléfono inválido' })
  readonly telefono?: string;

  @IsOptional()
  @IsString()
  readonly vehiculo?: string;

  @IsOptional()
  @IsBoolean()
  readonly disponible?: boolean;
}
