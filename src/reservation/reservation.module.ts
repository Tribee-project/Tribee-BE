import { Module } from '@nestjs/common';

import { ReservationController } from './reservation.controller';
import { ReservationService } from './reservation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelProduct, TravelProductSchema } from 'src/product/product.document';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    MongooseModule.forFeature([
      { name: TravelProduct.name, schema: TravelProductSchema },
    ])

  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
