import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/auth.register.dto';
import { LoginDto } from './dto/auth.login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Register, RegisterDocument } from './schemas/auth.register.schema';
import * as bcrypt from 'bcrypt';
import { Login, LoginDocument } from './schemas/auth.login.shcema';


@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Register.name) private registerModel: Model<RegisterDocument>,
    @InjectModel(Login.name) private loginModel: Model<LoginDocument>,
  ) {}

  async register(registerDto: RegisterDto): Promise<any> {
    const { name, password, email, cellphone, userType } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new this.registerModel({
      name,
      password: hashedPassword,
      email,
      cellphone,
      userType,
    });

    await newUser.save();

    return { message: 'Usuario registrado con éxito' };
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
}
