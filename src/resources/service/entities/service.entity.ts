import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { TypeServiceEnum } from 'src/enums/type.service.enum';
import { TimestampEntity } from 'src/generics/timestamp.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from 'src/resources/post/entities/post.entity';
import { RealEstate } from '../real-estate/entities/real-estate.entity';
import { HomeService } from '../home-service/entities/home-service.entity';
import { Product } from '../../product/entities/product.entity';

@Entity('service')
export class Service extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 20,
  })
  refService: string;

  @Column({
    length: 64,
    nullable: true,
  })
  title: string;

  @Column({
    length: 128,
    nullable: true,
  })
  description: string;

  @Column({
    type: 'enum',
    enum: TypeServiceEnum,
    default: TypeServiceEnum.REAL_ESTATE,
  })
  type: string;

  @Column({
    length: 16,
  })
  paymentRate: string;

  @Column({
    nullable: true,
  })
  nbrPaymentMin: number;

  @Column()
  amount: number;

  @Column({
    length: 128,
    nullable: true,
  })
  country: string;

  @Column({
    length: 128,
    nullable: true,
  })
  region: string;

  @Column({
    nullable: true,
  })
  longitude: number;

  @Column({
    nullable: true,
  })
  latitude: number;

  @ManyToOne((type) => AccountEntity, (account) => account.services)
  account: AccountEntity;

  @OneToOne(() => Service, { cascade: true })
  @JoinColumn()
  realEstate: RealEstate;

  @OneToOne(() => Service, { cascade: true })
  @JoinColumn()
  homeService: HomeService;

}
