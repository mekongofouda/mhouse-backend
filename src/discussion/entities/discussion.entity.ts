import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Discussion {

    @PrimaryColumn()
    reference: string;

    @Column()
    title: string;
    
    @Column()
    description : string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
