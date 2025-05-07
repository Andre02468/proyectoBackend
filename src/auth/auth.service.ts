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

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Register.name) private registerModel: Model<RegisterDocument>,
    @InjectModel(Login.name) private loginModel: Model<LoginDocument>,
    private readonly emailService: EmailService, 
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    const { name, password, email, cellphone, userType } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const verificationCode = randomBytes(3).toString('hex').toUpperCase(); 

    const newUser = new this.registerModel({
      name,
      password: hashedPassword,
      email,
      cellphone,
      userType,
      verificationCode, 
      isVerified: false, 
    });

    await newUser.save();
    await this.emailService.sendVerificationEmail(email, name, verificationCode);

    return { message: 'Usuario registrado con éxito. Verifica tu correo electrónico.' };
  }

  async login(loginDto: LoginDto): Promise<any> {
    const { name, password } = loginDto;

    const user = await this.registerModel.findOne({ name });

    if (!user) {
      return { message: 'Usuario no encontrado' };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { message: 'Contraseña incorrecta' };
    }

    return { message: 'Login exitoso', user };
  }

  async verificationCode(verificationCodeDto: VerificationCodeDto): Promise<any> {
    const { name, code } = verificationCodeDto;

    // Buscar al usuario por su nombre
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
}
