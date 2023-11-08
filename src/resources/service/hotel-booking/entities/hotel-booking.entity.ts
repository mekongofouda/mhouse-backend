import { TypeHotelBookingEnum } from "src/enums/type.hotel-booking.enum";
import { TimestampEntity } from "src/generics/timestamp.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "../../entities/service.entity";
import { HotelBookingService } from "../hotel-booking-service/entities/hotel-booking-service.entity";

@Entity('hotel-booking')
export class HotelBooking extends TimestampEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 20
    })
    refHotelBooking: string;

    @Column({
        length: 64,
        nullable: true
    })
    hotelName: string;

    @Column({
        type: 'enum',
        enum: TypeHotelBookingEnum,
        default: TypeHotelBookingEnum.MOTEL
    })
    type: string;

    @Column({
        nullable: true
    })
    image: string;

    @OneToOne(
        type => Service,
        (service) => service.hotelBooking
    )
    service: Service;

    @OneToMany(
        type => HotelBookingService,
        (hotelBookingService) => hotelBookingService.hotelBooking
    )
    hotelBookingServices: HotelBookingService[];
}
