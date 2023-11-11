import { TypeHomeCareEnum } from "src/enums/type.home-care.enum";
import { TimestampEntity } from "src/generics/timestamp.entity";
import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "../../entities/service.entity";
import { HomeCareRealisation } from "../home-care-realisation/entities/home-care-realisation.entity";

@Entity('home-care')
export class HomeCare extends TimestampEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 20
    })
    refHomeCare: string;

    @Column({
        type: 'enum',
        enum: TypeHomeCareEnum,
        default: TypeHomeCareEnum.JARDINERIE
    })
    type: string

    @Column({
        nullable: true
    })
    image: string

    @OneToOne(
        type => Service,
        (service) => service.homeCare
    )
    service: Service; 

    @OneToMany(
        type => HomeCareRealisation,
        (homeCareRealisations) => homeCareRealisations.homeCare
    )
    homeCareRealisations: HomeCareRealisation[]

}
