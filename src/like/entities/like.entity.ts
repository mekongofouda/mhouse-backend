import { TimestampEntity } from "src/generics/timestamp.entity";
import { PostEntity } from "src/post/entities/post.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Like extends TimestampEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 20
    })
    refLike: string;
    
    @Column()
    isLiked: boolean;

    @ManyToOne(
        type => PostEntity,
        (post) => post.likes
    )
    post : PostEntity; 

}
