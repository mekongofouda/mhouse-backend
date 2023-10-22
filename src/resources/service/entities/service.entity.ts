import { AccountEntity } from "src/resources/account/entities/account.entity";
import { TypeServiceEnum } from "src/enums/type.service.enum";
import { TimestampEntity } from "src/generics/timestamp.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { PostEntity } from "src/resources/post/entities/post.entity";
import { RealEstate } from "../real-estate/entities/real-estate.entity";
import { HomeCare } from "../home-care/entities/home-care.entity";
import { HomeStanding } from "../home-standing/entities/home-standing.entity";
import { HotelBooking } from "../hotel-booking/entities/hotel-booking.entity";

@Entity('service')
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
    
    @Column({
        nullable: true
    })
    nbrPaymentMin: number;

    @Column()
    amount: number;

    @Column({
        length: 128,
        nullable: true
    })
    country: string;

    @Column({
        length: 128,
        nullable: true
    })
    region: string;

    @Column({
        nullable: true
    })
    longitude: number;

    @Column({
        nullable: true
    })
    latitude: number;

    @ManyToOne(
        type => AccountEntity,
        (account) => account.services
    )
    account : AccountEntity; 

    @OneToMany(
        type => PostEntity,
        (post) => post.service
    )
    posts: PostEntity[];

    @OneToOne(
        type => RealEstate,
        (realEstate) => realEstate.service
    )
    realEstate: RealEstate;

    @OneToOne(
        type => HomeCare,
        (homeCare) => homeCare.service
    )
    homeCare: HomeCare;

    @OneToOne(
        type => HomeStanding,
        (homeStanding) => homeStanding.service
    )
    homeStanding: HomeStanding;

    @OneToOne(
        type => HotelBooking,
        (hotelBooking) => hotelBooking.service
    )
    hotelBooking: HotelBooking;

}
