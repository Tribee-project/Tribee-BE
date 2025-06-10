import { Module } from '@nestjs/common';

import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Reservation } from 'src/reservation/reservation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review]),
    TypeOrmModule.forFeature([Reservation])
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
