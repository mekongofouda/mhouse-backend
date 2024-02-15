import { NotificationTypeEnum } from 'src/enums/notification-type.enum';
import { TimestampEntity } from 'src/generics/timestamp.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Notification extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 16,
  })
  refNotification: string;

  @Column({
    length: 32,
  })
  subject: string;

  @Column({
    type: 'enum',
    enum: NotificationTypeEnum,
    default: NotificationTypeEnum.POST,
  })
  type: string;
}
