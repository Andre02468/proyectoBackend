import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/auth.register.dto';
import { LoginDto } from './dto/auth.login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Register, RegisterDocument } from './schemas/auth.register.schema';
import * as bcrypt from 'bcrypt';
import { Login, LoginDocument } from './schemas/auth.login.shcema';
import { EmailService } from '../email/email.service'; 
import { randomBytes } from 'crypto';
import { VerificationCodeDto } from './dto/auth.verificationCode.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Register.name) private registerModel: Model<RegisterDocument>,
    @InjectModel(Login.name) private loginModel: Model<LoginDocument>,
    private readonly emailService: EmailService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    const { name, password, email, cellphone} = registerDto;

    if (password.length < 6) {
      return { message: 'La contraseña debe tener al menos 6 caracteres.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationCode = randomBytes(3).toString('hex').toUpperCase();

    const newUser = new this.registerModel({
      name,
      password: hashedPassword,
      email,
      cellphone,
      verificationCode,
      isVerified: false,
    });

    await newUser.save();
    await this.emailService.sendVerificationEmail(email, name, verificationCode);

    return { message: 'Usuario registrado con éxito. Verifica tu correo electrónico.' };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { name, password } = loginDto;
    const normalizedInputName = this.normalizeName(name);

    const users = await this.registerModel.find().exec();
    const user = users.find(u => this.normalizeName(u.name) === normalizedInputName);

    if (!user) {
      return { message: 'Usuario no encontrado' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { message: 'Contraseña incorrecta' };
    }

    const tokens = await this.getTokens(user.name, user.email);

    const hashedRefreshToken = await bcrypt.hash(tokens.refreshToken, 10);
    await user.save();

    return {
      ...tokens,
      user
    };
    return { message: 'Login exitoso', user };
  }

  async verificationCode(verificationCodeDto: VerificationCodeDto): Promise<any> {
    const { name, code } = verificationCodeDto;

    const user = await this.registerModel.findOne({ name });

    if (!user) {
      return { message: 'Usuario no encontrado' };
    }

    if (user.verificationCode !== code) {
      return { message: 'Código de verificación incorrecto' };
    }

    user.isVerified = true;
    await user.save();

    return { message: 'Código de verificación correcto, usuario verificado' };
  }

  private normalizeName(name: string): string {
    return name
      .toLowerCase()
      .replace(/[\s._-]+/g, '') 
      .normalize('NFD')         
      .replace(/[\u0300-\u036f]/g, '');
  }

  private async getTokens(
    name: string,
    email: string,
  ): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { name, email },
        {
          secret: this.configService.get('JWT_ACCESS_SECRET'),
          expiresIn: this.configService.get('JWT_ACCESS_EXPIRATION'),
        },
      ),
      this.jwtService.signAsync(
        { sub: name, email},
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: this.configService.get('JWT_REFRESH_EXPIRATION'),
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
