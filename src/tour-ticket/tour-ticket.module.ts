import { Module } from '@nestjs/common';
import { TourTicketService } from './tour-ticket.service';
import { TourTicketController } from './tour-ticket.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TourTicketProduct, TourTicketSchema } from './tour-ticket.document';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TourTicketProduct.name, schema: TourTicketSchema},
    ])
  ],
  controllers: [TourTicketController],
  providers: [TourTicketService],
})
export class TourTicketModule {}
