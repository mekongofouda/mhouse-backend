import { Discussion } from "src/resources/discussion/entities/discussion.entity";
import { TimestampEntity } from "src/generics/timestamp.entity";
import { PostEntity } from "src/resources/post/entities/post.entity";
import { Role } from "src/resources/role/entities/role.entity";
import { Service } from "src/resources/service/entities/service.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Like } from "src/resources/post/like/entities/like.entity";

@Entity('account')
export class AccountEntity extends TimestampEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 20,
        nullable: true
    })
    refAccount: string;

    @Column({
        length: 32
    })
    name: string;
    
    @Column({
        length: 32,
        nullable: true
    })
    surname : string;
    
    @Column({
        nullable: true
    })
    dayBirth : Date;
    
    @Column({
        length: 32,
        nullable: true
    })
    placeBirth : string;
    
    @Column({
        unique: true,
        length:16,
        nullable: true
    })
    icn : string;
    
    @Column({
        unique: true
    })
    email : string;
    
    @Column({
        unique: true,
    })
    phone : number;
    
    @Column({
        nullable: true
    })
    avatar : string;
    
    @Column({
        nullable: true
    })
    resetCode : number;

    @Column()
    password : string;
    
    @Column({
        nullable: true
    }) 
    salt : string;
    
    @Column({
        nullable: true
    })
    token: string;

    @Column(
        {
            type: "simple-array",
            nullable: true, 
            default: []
        })
    followed : string[] ;

    @ManyToOne(
        type => Role,
        (role) => role.accounts,    
    )
    role : Role; 

    @OneToMany(
        type => PostEntity,
        (post) => post.account,
        {
            eager: true
        }
    )
    posts : PostEntity[]; 

    @OneToMany(
        type => Service,
        (service) => service.account,
        {
            eager: true
        }
    )
    services : Service[]; 

    @ManyToMany(
        type => Discussion,
        (discussion) => discussion.accounts,
        {
            eager: true
        }
    )
    @JoinTable()
    discussions : Discussion[]; 

    @ManyToOne(
        type => Like,
        (like) => like.account
    )
    likes : Like[];

}
 