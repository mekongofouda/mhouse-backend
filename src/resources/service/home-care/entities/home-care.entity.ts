import { TypeHomeCareEnum } from "src/enums/type.home-care.enum";
import { TimestampEntity } from "src/generics/timestamp.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "../../entities/service.entity";

@Entity('home-care')
export class HomeCare extends TimestampEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 20,
        nullable: true
    })
    refHomeCare: string;

    @Column({
        type: 'enum',
        enum: TypeHomeCareEnum,
        default: TypeHomeCareEnum.HOME_CARE
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

}
