import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Register, RegisterSchema } from './schemas/auth.register.schema';
import { Login, LoginSchema } from './schemas/auth.login.shcema';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Register.name, schema: RegisterSchema },
      { name: Login.name, schema: LoginSchema },
    ]),
    EmailModule, 
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
