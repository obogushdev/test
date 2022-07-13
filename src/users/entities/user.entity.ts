import { Table, Model, Column, DataType, HasMany } from 'sequelize-typescript';
import { CarbonCertificate } from 'src/carbon-certificates/entities/carbon-certificate.entity';


@Table
export class User extends Model {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @HasMany(() => CarbonCertificate)
  carbonCertificates: CarbonCertificate[];
  
}
