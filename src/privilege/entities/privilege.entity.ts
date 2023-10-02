import { TimestampEntity } from 'src/generics/timestamp.entity';
import { Role } from 'src/role/entities/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class Privilege extends TimestampEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 20,
        unique: true
    })
    refPrivilege: string;

    @Column({
        length: 32,
    })
    title: string;

    @Column({
        length: 128,
        nullable: true
    })
    description: string;

    @Column({
        length: 128
    }) 
    resource: string; 
    
    @ManyToMany(
        type => Role,
        (role) => role.privileges
    )
    @JoinTable()
    roles: Role[];

} 
