import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Account {
    
    @PrimaryColumn()
    reference: string;

    @Column()
    name: string;

    @Column()
    password: string;

}
