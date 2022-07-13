import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, Put } from '@nestjs/common';
import { CarbonCertificatesService } from './carbon-certificates.service';
import { AuthGuard } from "@nestjs/passport";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CarbonCertificate } from './entities/carbon-certificate.entity';

@Controller('carbon-certificates')
@ApiTags("Carbon Certificates")
@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
export class CarbonCertificatesController {
  constructor(private readonly carbonCertificatesService: CarbonCertificatesService) {}


  @Get()
  @ApiResponse({
      status: HttpStatus.OK,
      type: [CarbonCertificate],
      description: "Available carbon certificates"
  })
  @ApiOperation({ summary: "Get list of available carbon certificates" })
  public async getAvailableCertificates(): Promise<CarbonCertificate[]> {
      return this.carbonCertificatesService.getAvailableCertificates();
  }

  @Get(":ownerId/owned")
  @ApiResponse({
      status: HttpStatus.OK,
      type: [CarbonCertificate],
      description: "Carbon certificates owned by current user"
  })
  @ApiOperation({ summary: "Get list of owned carbon certificates" })
  public async getOwnedCarbonCertificatesByUser( @Param("ownerId") ownerId: number ): Promise<CarbonCertificate[]> {
      return this.carbonCertificatesService.getOwnedCertificates(ownerId);
  }

  @Put(":ownerId/owned/:certificateId/transfer/:newUserId")
  @ApiResponse({
      status: HttpStatus.OK,
      type: [CarbonCertificate],
      description: "Transferred carbon certificate"
  })
  @ApiOperation({ summary: "Transfer carbon certificate to the another existing user" })
  public async transferCertificateToUser(
    @Param("ownerId") ownerId: number,
    @Param("certificateId") certificateId: number,
    @Param("newUserId") newUserId: number
  ): Promise<CarbonCertificate> {
      return this.carbonCertificatesService.transferCertificate(ownerId, certificateId, newUserId);
  }

}
