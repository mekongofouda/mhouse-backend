import { AccountEntity } from "src/account/entities/account.entity";
import { TimestampEntity } from "src/generics/timestamp.entity";
import { Message } from "src/message/entities/message.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Discussion extends TimestampEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 20
    })
    refDiscussion: string;

    @Column({
        length: 32
    })
    title: string;
    
    @Column({
        length: 128,
        nullable: true
    })
    description : string;

    @ManyToMany(
        type => AccountEntity,
        (account) => account.discussions
    )
    accounts : AccountEntity[]; 

    @OneToMany(
        type => Message,
        (message) => message.discussion
    )
    messages : Message[]; 

}
