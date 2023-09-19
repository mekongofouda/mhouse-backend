import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Notification {

    @PrimaryColumn()
    reference: string;

    @Column()
    name: string;
    
    @Column()
    surname : string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    type: string;

    @Column()
    ceatedAt: Date;

    @Column()
    updatedAt: Date;
}
