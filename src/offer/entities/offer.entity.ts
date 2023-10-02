import { PayementRateOfferEnum } from "src/enums/payement-rate-offer.enum";
import { TimestampEntity } from "src/generics/timestamp.entity";
import { PostEntity } from "src/post/entities/post.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Offer extends TimestampEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 20
    })
    refOffer: string;

    @Column({
        type: 'enum',
        enum: PayementRateOfferEnum,
        default: PayementRateOfferEnum.JOUR,
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

    @ManyToOne(
        type => PostEntity,
        (post) => post.offers
    )
    post : PostEntity; 

}
