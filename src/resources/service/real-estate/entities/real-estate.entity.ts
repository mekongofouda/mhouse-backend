import { StatusRealEstateEnum } from 'src/enums/status.real-estate.enum';
import { TypeRealEstateEnum } from 'src/enums/type.real-estate.enum';
import { TimestampEntity } from 'src/generics/timestamp.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Service } from '../../entities/service.entity';
import { AccountEntity } from 'src/resources/account/entities/account.entity';

@Entity('real-estate')
export class RealEstate extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 20,
  })
  refRealEstate: string;

  @Column({
    type: 'enum',
    enum: TypeRealEstateEnum,
    default: TypeRealEstateEnum.BEDROOM,
  })
  type: string;

  @Column({
    nullable: true,
  })
  surface: number;

  @Column({
    nullable: true,
  })
  surfBatie: number;

  @Column({
    nullable: true,
  })
  roadDistance: number;

  @Column({
    nullable: true,
    default: false,
  })
  garage: boolean;

  @Column({
    nullable: true,
    default: false,
  })
  cable: boolean;

  @Column({
    nullable: true,
    default: false,
  })
  internet: boolean;

  @Column({
    type: 'enum',
    enum: StatusRealEstateEnum,
    default: StatusRealEstateEnum.TO_SELL,
  })
  status: string;

  @Column({
    nullable: true,
  })
  image: string;

  @OneToOne((type) => Service, (service) => service.realEstate)
  service: Service;
  
  @ManyToOne((type) => AccountEntity, (account) => account.services)
  account: AccountEntity;

}
