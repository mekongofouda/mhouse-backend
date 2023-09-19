import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Offer {

    @PrimaryColumn()
    reference: string;

    @Column()
    paymentDate: string

    @Column()
    paymentRate: string

    @Column()
    nbrPaymentMin: number;

    @Column()
    amount: number;

    @Column()
    other: string;

    @Column()
    isValidated: boolean;

    @Column()
    isSent: boolean;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
