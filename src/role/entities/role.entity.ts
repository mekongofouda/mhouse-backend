import { AccountEntity } from "src/account/entities/account.entity";
import { TimestampEntity } from "src/generics/timestamp.entity";
import { Privilege } from "src/privilege/entities/privilege.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role extends TimestampEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 20
    })
    refRole: string;

    @Column({
        length: 32
    })
    title: string;
    
    @Column({
        length: 32
    })
    slug : string;

    @Column({
        length: 128,
        nullable: true
    })
    description: string;

    @OneToMany(
        type => AccountEntity,
        (account) => account.role
    )
    accounts: AccountEntity[];

    @ManyToMany(
        type => Privilege,
        (privilege) => privilege.roles
    )
    privileges: Privilege[];
}

