import { IsEmail, IsString, IsPhoneNumber, IsUUID } from 'class-validator';



export class RegisterDto {

  @IsString()
  readonly name: string;

  @IsString()
  readonly password: string;

  @IsEmail()
  readonly email: string;

  @IsPhoneNumber("CO", { message: 'Número de teléfono inválido' })
  readonly cellphone: string;

}
