import { ServiceTypeEnum } from "src/enums/service-type.enum";
import { TimestampEntity } from "src/generics/timestamp.entity";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Service extends TimestampEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 16
    })
    refService: string;

    @Column({
        length: 32
    })
    title: string;

    @Column({
        length: 128,
        nullable: true
    })
    description: string;

    @Column({
        type: 'enum',
        enum: ServiceTypeEnum,
        default: ServiceTypeEnum.REAL_ESTATE
    })
    type: string;

    @Column({
        length: 16
    })
    paymentRate: string;
    
    @Column()
    nbrPaymentMin: number;

    @Column()
    amount: number;

}
