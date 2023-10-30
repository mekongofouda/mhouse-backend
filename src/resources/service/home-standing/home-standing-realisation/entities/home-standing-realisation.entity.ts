import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { HomeStanding } from "../../entities/home-standing.entity";
import { TypeHomeStandingEnum } from "src/enums/type.home-standing.enum";
import { TypeHomeStandingRealisationEnum } from "src/enums/type.home-standing-realisation.enum";

@Entity('hotel-standing-realisation')
export class HomeStandingRealisation {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 20,
    })
    refHoomeStandingRealisation: string;

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
        enum: TypeHomeStandingRealisationEnum,
        default: TypeHomeStandingRealisationEnum.HOME_STANDING
    })
    type: string

    @Column({
        nullable: true
    })
    image: string

    @ManyToOne(
        type => HomeStanding,
        (homeStanding) => homeStanding.homeStandingRealisations
    )
    homeStanding: HomeStanding;

}
