import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Register, RegisterSchema } from './schemas/auth.register.schema';
import { Login, LoginSchema } from './schemas/auth.login.shcema';
import { EmailModule } from '../email/email.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Cliente, ClienteSchema } from 'src/client/schemas/client.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Register.name, schema: RegisterSchema },
      { name: Login.name, schema: LoginSchema },
      { name: Cliente.name, schema:ClienteSchema}
    ]),
    EmailModule, 
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (ConfigService: ConfigService)=> ({
        secret: ConfigService.get('JWT_ACCESS_SECRET'),
        signOptions: {
          expiresIn: ConfigService.get('JWT_ACCESS_EXPIRATION'),
        }
      })
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
