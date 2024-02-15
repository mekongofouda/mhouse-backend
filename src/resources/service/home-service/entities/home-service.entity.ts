import { TypeHomeServiceEnum } from 'src/enums/type.home-service.enum';
import { TimestampEntity } from 'src/generics/timestamp.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Service } from '../../entities/service.entity';
import { AccountEntity } from 'src/resources/account/entities/account.entity';

@Entity('home-service')
export class HomeService extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 20,
  })
  refHomeService: string;

  @Column({
    type: 'enum',
    enum: TypeHomeServiceEnum,
    default: TypeHomeServiceEnum.MACON,
  })
  type: string;

  @Column({
    nullable: true,
  })
  image: string;

  @OneToOne((type) => Service, (service) => service.homeService)
  service: Service;

  @ManyToOne((type) => AccountEntity, (account) => account.services)
  account: AccountEntity;
}
