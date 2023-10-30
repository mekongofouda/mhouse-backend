import { StatusRealEstateEnum } from "src/enums/status.real-estate.enum";
import { TypeRealEstateEnum } from "src/enums/type.real-estate.enum";
import { TimestampEntity } from "src/generics/timestamp.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "../../entities/service.entity";
import { Room } from "../room/entities/room.entity";

@Entity('real-estate')
export class RealEstate extends TimestampEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 20
    })
    refRealEstate: string;

    @Column({
        type: 'enum',
        enum: TypeRealEstateEnum,
        default: TypeRealEstateEnum.BEDROOM
    })
    type: string;

    @Column({
        nullable: true
    })
    surface: number;

    @Column({
        nullable: true
    })
    surfBatie: number;

    @Column({
        nullable: true
    })
    roadDistance: number;

    @Column({
        nullable: true,
        default: false
    })
    garage: boolean;

    @Column({
        nullable: true,
        default: false
    })
    cable: boolean;

    @Column({
        nullable: true,
        default: false

    })
    internet: boolean;

    @Column({
        type: 'enum',
        enum: StatusRealEstateEnum,
        default: StatusRealEstateEnum.TO_SELL
    })
    status: string;
    
    @Column({
        nullable: true
    })
    image: string;

    @OneToOne(
        type => Service,
        (service) => service.realEstate
    )
    service: Service;

    @OneToMany(
        type => Room,
        (room) => room.realEstate
    )
    rooms: Room[]
    
}

