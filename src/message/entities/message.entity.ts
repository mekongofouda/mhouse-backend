import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Message {

    @PrimaryColumn()
    reference: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    cc: string;

    @Column()
    pj: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
