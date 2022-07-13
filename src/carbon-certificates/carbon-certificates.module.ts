import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CarbonCertificatesService } from './carbon-certificates.service';
import { CarbonCertificatesController } from './carbon-certificates.controller';
import { UsersModule } from 'src/users/users.module';
import { CarbonCertificate } from './entities/carbon-certificate.entity';
import { SeedCertificates } from './seeds/carbon-certificates.seed';
import { SeederModule } from 'nestjs-sequelize-seeder';

@Module({
  imports: [
    SeederModule.forFeature([SeedCertificates]),
    SequelizeModule.forFeature([CarbonCertificate]), UsersModule],
  controllers: [CarbonCertificatesController],
  providers: [CarbonCertificatesService],
  exports: [CarbonCertificatesService]
})
export class CarbonCertificatesModule {}
