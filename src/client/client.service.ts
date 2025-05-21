import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cliente } from './schemas/client.schema';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';
import { CreateClienteDto } from './client.dto';
import { RegisterDto } from './client.register.dto';
import { LoginDto } from './client.login.dto';
import { VerificationCodeDto } from './client.verificationCode.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectModel(Cliente.name) private clienteModel: Model<Cliente>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
  ) {}

  async create(createClienteDto: CreateClienteDto): Promise<Cliente> {
    const cliente = new this.clienteModel(createClienteDto);
    return cliente.save();
  }

  async findById(id: string): Promise<Cliente> {
    const cliente = await this.clienteModel.findById(id).populate('historialPedidos').exec();
    if (!cliente) {
      throw new NotFoundException(`Cliente con id ${id} no encontrado`);
    }
    return cliente;
  }

  async agregarPedido(clienteId: string, pedidoId: string): Promise<Cliente> {
    const cliente = await this.clienteModel.findById(clienteId).populate('historialPedidos').exec();
    if (!cliente) {
      throw new NotFoundException(`Cliente con id ${clienteId} no encontrado`);
    }
    return cliente.save();
  }

  async registerClient(registerDto: RegisterDto) {
    const { name, password, email, cellphone } = registerDto;

    if (password.length < 6) {
      throw new BadRequestException('La contraseña debe tener al menos 6 caracteres.');
    }

    const normalizedName = this.normalizeName(name);

    const existing = await this.clienteModel.findOne({ nombre: new RegExp(`^${normalizedName}$`, 'i') });
    if (existing) {
      throw new BadRequestException('Ya existe un cliente con ese nombre.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = randomBytes(3).toString('hex').toUpperCase();

    const newClient = new this.clienteModel({
      nombre: normalizedName,
      password: hashedPassword,
      email,
      telefono: cellphone,
      verificationCode,
      isVerified: false,
    });

    await newClient.save();
    await this.emailService.sendVerificationEmail(email, name, verificationCode);

    return { message: 'Cliente registrado con éxito. Verifica tu correo electrónico.' };
  }

  async loginClient(loginDto: LoginDto) {
    const { name, password } = loginDto;
    const normalizedInput = this.normalizeName(name);

    const client = await this.clienteModel.findOne({ nombre: new RegExp(`^${normalizedInput}$`, 'i') });
    if (!client) throw new NotFoundException('Cliente no encontrado');

    const isPasswordValid = await bcrypt.compare(password, client.password);
    if (!isPasswordValid) throw new BadRequestException('Contraseña incorrecta');

    const tokens = await this.getTokens(client._id.toString(), client.email);

    return {
      ...tokens,
      client,
    };
  }

  async verifyCode(verificationCodeDto: VerificationCodeDto) {
    const { name, code } = verificationCodeDto;
    const normalizedName = this.normalizeName(name);

    const client = await this.clienteModel.findOne({ nombre: new RegExp(`^${normalizedName}$`, 'i') });

    if (!client) throw new NotFoundException('Cliente no encontrado');

    if (client.verificationCode !== code.trim().toUpperCase()) {
      throw new BadRequestException('Código de verificación incorrecto');
    }

    client.isVerified = true;
    await client.save();

    return { message: 'Código verificado correctamente' };
  }

  private normalizeName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[\s._-]+/g, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  private async getTokens(id: string, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { sub: id, email },
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRATION'),
        },
      ),
      this.jwtService.signAsync(
        { sub: id, email },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRATION'),
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
