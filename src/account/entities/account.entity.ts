import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Account {
    
    @PrimaryColumn()
    reference: string;

    @Column()
    name: string;
    
    @Column()
    surname : string;
    
    @Column()
    dayBirth : Date;
    
    @Column()
    placeBirth : string;
    
    @Column()
    icn : number;
    
    @Column()
    email : string;
    
    @Column()
    phone : number;
    
    @Column()
    avatar : string;
    
    @Column()
    password : string;
    
    @Column()
    salt : string;
    
    @Column()
    token: string;
    
    @Column()
    role : string;
    
    @Column()
    createdAt : Date;
    
    @Column()
    updatedAt : Date;

}
