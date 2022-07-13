import 'dotenv/config' 
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CarbonCertificatesModule } from './carbon-certificates/carbon-certificates.module';
import { User } from './users/entities/user.entity';
import { CarbonCertificate } from './carbon-certificates/entities/carbon-certificate.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './auth/auth.module';
import { SeederModule } from 'nestjs-sequelize-seeder';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        dialect: 'mysql',
        synchronize: true,
        autoLoadModels: true,
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        models: [User, CarbonCertificate],
      }),
    }),
    SeederModule.forRoot({
       runOnlyIfTableIsEmpty: false,
   }),
    AuthModule, UsersModule, CarbonCertificatesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
