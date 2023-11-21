import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { HotelBooking } from "../../entities/hotel-booking.entity";
import { TypeHotelBookingServiceEnum } from "src/enums/type.hotel-booking-service.enum";
import { TimestampEntity } from "src/generics/timestamp.entity";

@Entity('hotel-booking-service')
export class HotelBookingService extends TimestampEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 20,
    })
    refHotelBookingService: string;

    @Column({
        length: 64,
        nullable: true
    })
    title: string;

    @Column({
        length: 256,
        nullable: true
    })
    description: string;

    @Column({
        type: 'enum',
        enum: TypeHotelBookingServiceEnum,
        default: TypeHotelBookingServiceEnum.MOTEL
    })
    type: string

    @Column({
        nullable: true
    })
    image: string

    @ManyToOne(
        type => HotelBooking,
        (hotelBooking) => hotelBooking.hotelBookingServices
    )
    hotelBooking: HotelBooking;
}
