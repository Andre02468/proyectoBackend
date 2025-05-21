import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ClienteService } from './client.service';
import { CreateClienteDto } from './client.dto';
import { RegisterDto } from './client.register.dto';
import { LoginDto } from './client.login.dto';
import { VerificationCodeDto } from './client.verificationCode.dto';


@Controller('cliente')
export class ClienteController {
  constructor(private readonly clienteService: ClienteService) {}

  @Post()
  createCliente(@Body() createClienteDto: CreateClienteDto) {
    return this.clienteService.create(createClienteDto);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.clienteService.registerClient(registerDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.clienteService.loginClient(loginDto);
  }

  @Post('verify-code')
  async verifyCode(@Body() verificationCodeDto: VerificationCodeDto) {
    return this.clienteService.verifyCode(verificationCodeDto);
  }
}
