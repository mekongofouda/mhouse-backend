import { Discussion } from "src/discussion/entities/discussion.entity";
import { TimestampEntity } from "src/generics/timestamp.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message extends TimestampEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 20
    })
    refMessage: string;

    @Column({
        length: 128,
        nullable: true
    })
    description: string;

    @Column()
    cc: string;

    @Column({
        nullable: true
    })
    pj: string;

    @ManyToOne(
        type => Discussion,
        (discussion) => discussion.messages
    )
    discussion : Discussion; 

}
