import { TimestampEntity } from "src/generics/timestamp.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Offer extends TimestampEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 16
    })
    refOffer: string;

    @Column({
        nullable: true
    })
    paymentRate: string

    @Column({
        nullable: true
    })
    nbrPaymentMin: number;

    @Column({
        nullable: true
    })
    amount: number;

    @Column({
        length: 128,
        nullable: true
    })
    other: string;

    @Column({
        default: false
    })
    status: boolean;

    @Column({
        default: true
    })
    isSent: boolean;
}
