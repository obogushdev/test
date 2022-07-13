import { PartialType } from '@nestjs/mapped-types';
import { CreateCarbonCertificateDto } from './create-carbon-certificate.dto';

export class UpdateCarbonCertificateDto extends PartialType(CreateCarbonCertificateDto) {}
