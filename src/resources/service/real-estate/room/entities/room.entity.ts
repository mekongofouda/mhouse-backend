import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { RealEstate } from "../../entities/real-estate.entity";
import { TypeRealEstateEnum } from "src/enums/type.real-estate.enum";

@Entity('room')
export class Room {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 20,
    })
    refRoom: string;

    @Column({
        length: 64,
        nullable: true
    })
    title: string;
    
    @Column({
        type: 'enum',
        enum: TypeRealEstateEnum,
        default: TypeRealEstateEnum.BEDROOM
    })
    type: string

    @Column({
        length: 256,
        nullable: true
    })
    description: string;

    @Column({
        nullable: true
    })
    superficie: number;

    @Column({
        nullable: true
    })
    image: string

    @ManyToOne(
        type => RealEstate,
        (realEstate) => realEstate.rooms
    )
    realEstate: RealEstate;
}
