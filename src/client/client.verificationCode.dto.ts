import { IsString, IsNotEmpty } from 'class-validator';

export class VerificationCodeDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  code: string;
}
