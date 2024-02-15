import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from 'src/generics/timestamp.entity';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { PostEntity } from 'src/resources/post/entities/post.entity';

@Entity()
export class Like extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 20,
  })
  refLike: string;

  @Column()
  isLiked: boolean;

  @ManyToOne((type) => PostEntity, (post) => post.likes)
  post: PostEntity;

  @ManyToOne((type) => AccountEntity, (account) => account.likes)
  account: AccountEntity;
}
