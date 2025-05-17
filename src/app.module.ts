import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { databaseConfig } from './auth/config/databse.config';
import { EmailModule } from './email/email.module';
import { ClienteModule } from './client/client.module'; 
import { RepartidorModule } from './repartidor/repartidor.module';
import { ComercianteModule } from './comerciante/comerciante.module';
import { PedidoModule } from './pedidos/pedidos.module';
import { ProductoModule } from './producto/producto.module';
import { RestauranteModule } from './restaurante/restaurante.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, 
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const uri = configService.get<string>('MONGODB_URI'); 
        return {
          uri,
          ...databaseConfig.options, 
        };
      },
    }),
    AuthModule,
    EmailModule,
    ClienteModule,
    RepartidorModule,
    ComercianteModule,
    PedidoModule,
    ProductoModule,
    RestauranteModule,  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
