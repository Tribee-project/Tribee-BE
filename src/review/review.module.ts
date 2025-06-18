import { Module } from '@nestjs/common';

import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Reservation } from 'src/reservation/reservation.entity';
import { User } from 'src/user/user.entity';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { TravelProduct, TravelProductSchema } from 'src/product/product.document';
import { TourTicketProduct, TourTicketSchema } from 'src/tour-ticket/tour-ticket.document';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    TypeOrmModule.forFeature([Reservation]),
    TypeOrmModule.forFeature([User]),
    MongooseModule.forFeature([
      {name: TravelProduct.name, schema: TravelProductSchema},
      {name: TourTicketProduct.name, schema: TourTicketSchema}
    ])
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
