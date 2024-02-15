import { AccountEntity } from 'src/resources/account/entities/account.entity';
import { TimestampEntity } from 'src/generics/timestamp.entity';
import { Message } from 'src/resources/discussion/message/entities/message.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Discussion extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 20,
  })
  refDiscussion: string;

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

  @ManyToMany((type) => AccountEntity, (account) => account.discussions)
  accounts: AccountEntity[];

  @OneToMany((type) => Message, (message) => message.discussion, {
    eager: true,
  })
  messages: Message[];
}
