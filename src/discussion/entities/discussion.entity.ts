import { TimestampEntity } from "src/generics/timestamp.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Discussion extends TimestampEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 16
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
    
}
