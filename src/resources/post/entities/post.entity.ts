import { AccountEntity } from "src/resources/account/entities/account.entity";
import { TimestampEntity } from "src/generics/timestamp.entity";
import { Like } from "src/resources/post/like/entities/like.entity";
import { Offer } from "src/resources/post/offer/entities/offer.entity";
import { Share } from "src/resources/post/share/entities/share.entity";
import { Sponsor } from "src/resources/post/sponsor/entities/sponsor.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Service } from "src/resources/service/entities/service.entity";

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
        length: 64,
        nullable: true
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
        (share) => share.post,
        { eager: true }
    )
    shares : Share[]; 

    @OneToMany(
        type => Like,
        (like) => like.post,
        { eager: true }
    )
    likes : Like[]; 

    @OneToMany(
        type => Offer,
        (offer) => offer.post,
        { eager: true }
    )
    offers : Offer[]; 

    @OneToMany(
        type => Sponsor,
        (sponsor) => sponsor.post,
        { eager: true }
    )
    sponsors : Sponsor[]; 

    @ManyToOne(
        type => AccountEntity,
        (account) => account.posts
    )
    account : AccountEntity; 
    
    @ManyToOne(
        type => Service,
        (service) => service.posts
    )
    service: Service;

}
