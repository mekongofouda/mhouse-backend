import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Privilege {

    @PrimaryColumn()
    refPrivilege: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column() 
    resource: string;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

}
