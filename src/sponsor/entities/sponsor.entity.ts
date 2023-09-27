import { TimestampEntity } from "src/generics/timestamp.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Sponsor extends TimestampEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 16
    })
    refSponsor: string;

    @Column({
        length: 16
    })
    town: string;

    @Column()
    nbrCustomers: number;

    @Column()
    nbrDays: number;

    @Column()
    cost: number;

    @Column({
        length: 16
    })
    devise: string;

}
