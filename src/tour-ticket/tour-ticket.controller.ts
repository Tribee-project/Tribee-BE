import { Controller, Get, Param, Query } from '@nestjs/common';
import { TourTicketService } from './tour-ticket.service';
import { CATEGORY } from './enum/tour-ticket-category.enum';

@Controller('/api/v1/tour-ticket')
export class TourTicketController {
  constructor(private readonly tourTicketService: TourTicketService) {}

  @Get()
  getTourTicketProduct(@Query('category') catetory?: CATEGORY) {
    return this.tourTicketService.getTourTicketProduct(catetory);
  }

  @Get('/:id')
  getTourTicketProductById(@Param('id') id: string) {
    return this.tourTicketService.getTourTicketProductById(id);
  }
}
