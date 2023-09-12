import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Privilege {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    resource: string;

}
