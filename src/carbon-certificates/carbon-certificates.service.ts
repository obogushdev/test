import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UsersService } from 'src/users/users.service';
import { CreateCarbonCertificateDto } from './dto/create-carbon-certificate.dto';
import { UpdateCarbonCertificateDto } from './dto/update-carbon-certificate.dto';
import { CarbonCertificate } from './entities/carbon-certificate.entity';
import { CARBON_CERTIFICATE_STATUS } from './types/certificate-status.type';

@Injectable()
export class CarbonCertificatesService {

  constructor(
    private readonly usersService: UsersService,

    @InjectModel(CarbonCertificate)
    private carbonCertificateModel: typeof CarbonCertificate,
) { }


async getAvailableCertificates(): Promise<CarbonCertificate[]> {
  return this.carbonCertificateModel.findAll({
      where: {
          status: CARBON_CERTIFICATE_STATUS.AVAILABLE
      }
  });
}

async getOwnedCertificates(userId: number): Promise<CarbonCertificate[]> {
  return this.carbonCertificateModel.findAll({
      where: {
          owner: userId
      }
  });
}

async transferCertificate(ownerId: number, certificateId: number, newUserId: number) {
  const [user, certificate] = await Promise.all([
      this.usersService.getUserById(newUserId),
      this.carbonCertificateModel.findByPk(certificateId)
  ]);

  if (!user) {
      throw new NotFoundException(`User ${newUserId} not found`);
  }

  if (!certificate) {
      throw new NotFoundException(`Certificate ${certificateId} not found`);
  }

  if (certificate.status !== CARBON_CERTIFICATE_STATUS.OWNED) {
      throw new BadRequestException("Only owned certificate can be transferred");
  }

  // if (certificate.owner !== user) {
  //     throw new BadRequestException("Certificate doesn't belong to user");
  // }

  certificate.owner = user.id;
  return certificate.save();
}

}
