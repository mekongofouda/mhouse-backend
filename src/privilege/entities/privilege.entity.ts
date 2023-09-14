import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Privilege {

    @PrimaryColumn()
    reference: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column() 
    resource: string;

    @Column()
    createdAt: string;

    @Column()
    updatedAt: string;

}
