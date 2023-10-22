import { AccountEntity } from "src/resources/account/entities/account.entity";
import { TimestampEntity } from "src/generics/timestamp.entity";
import { Privilege } from "src/resources/role/privilege/entities/privilege.entity";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
        unique: true,
        length: 32
    })
    title: string;
    
    @Column({
        unique: true,
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
        (account) => account.role,
        {
            eager: true
        }
    )
    accounts: AccountEntity[];

    @ManyToMany(
        type => Privilege,
        (privilege) => privilege.roles,
        {
            eager: true
        }
    )
    @JoinTable()
    privileges: Privilege[];
}

