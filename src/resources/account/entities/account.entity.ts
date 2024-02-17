import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Discussion } from 'src/resources/discussion/entities/discussion.entity';
import { TimestampEntity } from 'src/generics/timestamp.entity';
import { PostEntity } from 'src/resources/post/entities/post.entity';
import { Role } from 'src/resources/role/role/entities/role.entity';
import { Service } from 'src/resources/service/entities/service.entity';
import { Like } from 'src/resources/post/like/entities/like.entity';
import { Share } from 'src/resources/post/share/entities/share.entity';
import { Offer } from 'src/resources/post/offer/entities/offer.entity';
import { Sponsor } from 'src/resources/post/sponsor/entities/sponsor.entity';
import { Message } from 'src/resources/discussion/message/entities/message.entity';
import { Product } from 'src/resources/product/entities/product.entity';

@Entity('account')
export class AccountEntity extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
    nullable: true,
  })
  refAccount: string;

  @Column({
    length: 32,
  })
  name: string;

  @Column({
    length: 32,
    nullable: true,
  })
  surname: string;

  @Column({
    nullable: true,
  })
  dayBirth: Date;

  @Column({
    length: 32,
    nullable: true,
  })
  placeBirth: string;

  @Column({
    unique: true,
    length: 16,
    nullable: true,
  })
  icn: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    unique: true,
  })
  phone: number;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column({
    nullable: true,
  })
  resetCode: number;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  salt: string;

  @Column({
    nullable: true,
  })
  token: string;

  @Column({
    type: 'simple-array',
    nullable: true,
    default: '',
  })
  followed: string[];

  @Column({
    type: 'simple-array',
    nullable: true,
    default: '',
  })
  follower: string[];

  @ManyToOne((type) => Role, (role) => role.accounts, { eager: true })
  role: Role;

  @OneToMany((type) => PostEntity, (post) => post.account, { eager: true })
  posts: PostEntity[];

  @OneToMany((type) => Service, (service) => service.account, { eager: true })
  services: Service[];

  @OneToMany((type) => Product, (product) => product.account, { eager: true })
  products: Product[];

  @ManyToMany((type) => Discussion, (discussion) => discussion.accounts, {
    eager: true,
  })
  @JoinTable()
  discussions: Discussion[];

  @OneToMany((type) => Like, (like) => like.account, { eager: true })
  likes: Like[];

  @OneToMany((type) => Offer, (offer) => offer.account, { eager: true })
  offers: Offer[];

  @OneToMany((type) => Share, (share) => share.account, { eager: true })
  shares: Share[];

  @OneToMany((type) => Sponsor, (sponsor) => sponsor.account, { eager: true })
  sponsors: Sponsor[];

  @OneToMany((type) => Message, (message) => message.account, { eager: true })
  messages: Message[];
}
