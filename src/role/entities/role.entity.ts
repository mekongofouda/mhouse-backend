import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Role {

    @PrimaryColumn()
    reference: string;

    @Column()
    name: string;
    
    @Column()
    surname : string;

    @Column()
    description: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
