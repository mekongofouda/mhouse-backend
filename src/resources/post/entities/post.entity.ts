import { AccountEntity } from "src/resources/account/entities/account.entity";
import { TimestampEntity } from "src/generics/timestamp.entity";
import { Like } from "src/resources/like/entities/like.entity";
import { Offer } from "src/resources/offer/entities/offer.entity";
import { Share } from "src/resources/share/entities/share.entity";
import { Sponsor } from "src/resources/sponsor/entities/sponsor.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('post')
export class PostEntity extends TimestampEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true,
        length: 20
    })
    refPost: string;
   
    @Column({
        length: 32
    })
    title: string;
    
    @Column({
        length: 128,
        nullable: true
    })
    description: string;
    
    @Column({
        default: true
    })
    isPublished: boolean;

    @OneToMany(
        type => Share,
        (share) => share.post
    )
    shares : Share[]; 

    @OneToMany(
        type => Like,
        (like) => like.post,
        {
            eager: true
        }
    )
    likes : Like[]; 

    @OneToMany(
        type => Offer,
        (offer) => offer.post,
        {
            eager: true
        }
    )
    offers : Offer[]; 

    @OneToMany(
        type => Sponsor,
        (sponsor) => sponsor.post,
        {
            eager: true
        }
    )
    sponsors : Sponsor[]; 

    @ManyToOne(
        type => AccountEntity,
        (account) => account.posts
    )
    account : AccountEntity; 
}
