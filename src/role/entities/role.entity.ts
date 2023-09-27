import { Account } from "src/account/entities/account.entity";
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

    @ManyToMany(
        type => Account,
        (account) => account.roles
    )
    accounts: Account[];

    @OneToMany(
        type => Privilege,
        (privilege) => privilege.role
    )
    privileges: Privilege[];
}
function ManyToOne(arg0: (type: any) => typeof Role, arg1: (role: any) => any): (target: Role, propertyKey: "role") => void {
    throw new Error("Function not implemented.");
}

