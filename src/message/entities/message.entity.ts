import { TimestampEntity } from "src/generics/timestamp.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Message extends TimestampEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
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
}
