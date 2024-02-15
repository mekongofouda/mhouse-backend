import { TypeSponsorEnum } from 'src/enums/type.sponsor.enum';
import { TimestampEntity } from 'src/generics/timestamp.entity';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { PostEntity } from 'src/resources/post/entities/post.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sponsor extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 20,
  })
  refSponsor: string;

  @Column({
    length: 64,
    nullable: true,
  })
  town: string;

  @Column({
    nullable: true,
  })
  nbrCustomers: number;

  @Column({
    nullable: true,
  })
  nbrDays: number;

  @Column({
    type: 'enum',
    enum: TypeSponsorEnum,
    default: TypeSponsorEnum.HOME_CARE,
    nullable: true,
  })
  type: string;

  @Column({})
  cost: number;

  @Column({
    length: 16,
  })
  devise: string;

  @ManyToOne((type) => PostEntity, (post) => post.sponsors)
  post: PostEntity;

  @ManyToOne((type) => AccountEntity, (post) => post.sponsors)
  account: AccountEntity;
}
