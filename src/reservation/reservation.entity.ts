import { STATUS } from 'src/common/enum/data-stauts.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  prodId: string;

  @Column()
  reservationDate: Date;

  @Column()
  departureDate: Date;

  @Column()
  cost: number;

  @Column()
  personnel: number;

  @Column()
  isReviewed: boolean;

  @Column()
  status: STATUS;
}
