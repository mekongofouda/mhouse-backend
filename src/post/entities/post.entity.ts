import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Post {

    @PrimaryColumn()
    reference: string;
   
    @Column()
    title: string;
    
    @Column()
    description: string;
    
    @Column()
    isPublished: boolean;
    
    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;
}
