import { UserRoleEnum } from "src/enums/user-role.enum";
import { TimestampEntity } from "src/generics/timestamp.entity";
import { Role } from "src/role/entities/role.entity";
import { Column, Entity, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Account extends TimestampEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 20,
        nullable: true
    })
    refAccount: string;

    @Column({
        length: 32
    })
    name: string;
    
    @Column({
        length: 32,
        nullable: true
    })
    surname : string;
    
    @Column({
        nullable: true
    })
    dayBirth : Date;
    
    @Column({
        length: 32,
        nullable: true
    })
    placeBirth : string;
    
    @Column({
        unique: true,
        length:16,
        nullable: true
    })
    icn : string;
    
    @Column({
        unique: true
    })
    email : string;
    
    @Column({
        unique: true,
    })
    phone : number;
    
    @Column({
        nullable: true
    })
    avatar : string;
    
    @Column({
        nullable: true
    })
    category : string;

    @Column({
        length: 20,
        nullable: true
    })
    followers : string;

    @Column({
        nullable: true
    })
    dateStartPromo : Date;

    @Column()
    password : string;
    
    @Column({
        nullable: true
    }) 
    salt : string;
    
    @Column({
        nullable: true
    })
    token: string;

    @ManyToMany(
        type => Role,
        (role) => role.accounts
    )
    roles : Role[]; 

    
}
