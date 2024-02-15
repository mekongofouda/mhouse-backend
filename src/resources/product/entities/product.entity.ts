import { TypeProductEnum } from 'src/enums/type.product.enum';
import { TimestampEntity } from 'src/generics/timestamp.entity';
import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('product')
export class Product extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 20,
  })
  refProduct: string;

  @Column({
    length: 64,
    nullable: true,
  })
  hotelName: string;

  @Column({
    type: 'enum',
    enum: TypeProductEnum,
    default: TypeProductEnum.MOTEL,
  })
  type: string;

  @Column({
    nullable: true,
  })
  image: string;

  @ManyToOne((type) => AccountEntity, (account) => account.services)
  account: AccountEntity;
}
