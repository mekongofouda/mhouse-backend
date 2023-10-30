import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { HomeCare } from "../../entities/home-care.entity";
import { TypeHomeCareRealisationEnum } from "src/enums/type.home-care-realisation.enum";

@Entity('home-care-realisation')
export class HomeCareRealisation {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 20,
    })
    refHotelBooking: string;

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
        enum: TypeHomeCareRealisationEnum,
        default: TypeHomeCareRealisationEnum.HOME_CARE
    })
    type: string

    @Column({
        nullable: true
    })
    image: string

    @ManyToOne(
        type => HomeCare,
        (homeCare) => homeCare.homeCareRealisations
    )
    homeCare: HomeCare;

}
