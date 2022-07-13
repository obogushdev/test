import { Seeder, OnSeederInit } from 'nestjs-sequelize-seeder';
import { CarbonCertificate } from '../entities/carbon-certificate.entity';
import { CARBON_CERTIFICATE_STATUS } from '../types/certificate-status.type';

const salt = 10;

@Seeder({
   model: CarbonCertificate,
   unique: ['id'],
   // containsForeignKeys: true,
   // foreignDelay: 5000,
   // logging: true,
   // disabled: true,
})
export class SeedCertificates implements OnSeederInit {
    run() {
      const data = []
      for (let i = 0; i < 50; i++) {
        data.push(
            {
                country: `USA`,
                status: CARBON_CERTIFICATE_STATUS.AVAILABLE,
               //  owner: 0
            }
        );
      }
      // for (let i = 0; i < 5; i++) {
      //    for (let j = 0; j < 10; j++) {
      //    data.push(
      //        {
      //            country: `USA`,
      //            status: CARBON_CERTIFICATE_STATUS.OWNED,
      //            owner: i
      //        }
      //    );
      //  }
      // }
      
      return data;
   }
}