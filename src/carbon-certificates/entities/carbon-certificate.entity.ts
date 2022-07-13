import { Table, Model, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';
import { CARBON_CERTIFICATE_STATUS } from '../types/certificate-status.type';


@Table
export class CarbonCertificate extends Model {

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    })
    id: number;

    @Column({ type: DataType.STRING,allowNull: false })
    country: string;

    @Column({ 
        type: DataType.ENUM({ values: Object.keys(CARBON_CERTIFICATE_STATUS) }),
        allowNull: false
    })
    status: CARBON_CERTIFICATE_STATUS;

    @ForeignKey(() => User)
    @Column({ field: 'owner' })
    owner: number;
}