import { TimestampEntity } from 'src/generics/timestamp.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subscription extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 20,
  })
  refSubscription: string;

  @Column({
    length: 64,
    nullable: true,
  })
  type: string;

  @Column({
    length: 128,
    nullable: true,
  })
  nbreMonths: string;

  @Column({
    length: 64,
    nullable: true,
  })
  amount: string;
}
