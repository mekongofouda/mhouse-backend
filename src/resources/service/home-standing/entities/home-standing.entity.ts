import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "../../entities/service.entity";
import { TypeHomeStandingEnum } from "src/enums/type.home-standing.enum";

@Entity('hotel-standing')
export class HomeStanding {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 20
    })
    refHomeStanding: string;

    @Column({
        type: 'enum',
        enum: TypeHomeStandingEnum,
        default: TypeHomeStandingEnum.HOME_CARE
    })
    type: string

    @Column({
        nullable: true
    })
    image: string

    @OneToOne(
        type => Service,
        (service) => service.homeStanding
    )
    service: Service;
}
