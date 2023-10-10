import { AccountEntity } from "src/resources/account/entities/account.entity";
import { TypeServiceEnum } from "src/enums/type.service.enum";
import { TimestampEntity } from "src/generics/timestamp.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Service extends TimestampEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 20
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
        enum: TypeServiceEnum,
        default: TypeServiceEnum.REAL_ESTATE
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

    @ManyToOne(
        type => AccountEntity,
        (account) => account.services
    )
    account : AccountEntity; 


}
