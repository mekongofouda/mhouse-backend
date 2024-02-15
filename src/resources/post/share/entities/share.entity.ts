import { TypeShareEnum } from 'src/enums/type.share.enum';
import { TimestampEntity } from 'src/generics/timestamp.entity';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { PostEntity } from 'src/resources/post/entities/post.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Share extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 20,
  })
  refShare: string;

  @Column({
    length: 64,
  })
  adress: string;

  @Column({
    type: 'enum',
    enum: TypeShareEnum,
    default: TypeShareEnum.GMAIL_SHARE,
    nullable: true,
  })
  type: string;

  @ManyToOne((type) => PostEntity, (post) => post.shares)
  post: PostEntity;

  @ManyToOne((type) => AccountEntity, (account) => account.shares)
  account: AccountEntity;
}
