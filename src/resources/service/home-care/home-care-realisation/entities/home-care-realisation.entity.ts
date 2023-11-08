import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { HomeCare } from "../../entities/home-care.entity";
import { TypeHomeCareRealisationEnum } from "src/enums/type.home-care-realisation.enum";
import { TimestampEntity } from "src/generics/timestamp.entity";

@Entity('home-care-realisation')
export class HomeCareRealisation extends TimestampEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 20,
    })
    refHomeCareRealisation: string;

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
