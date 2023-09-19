import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Like {

    @PrimaryColumn()
    reference: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

}
