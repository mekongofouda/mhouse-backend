import { TypeHotelBookingEnum } from "src/enums/type.hotel-booking.enum";
import { TimestampEntity } from "src/generics/timestamp.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "../../entities/service.entity";

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

}
