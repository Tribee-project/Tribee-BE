import { Controller, Get, Query } from '@nestjs/common';

import { EventService } from './event.service';
import { STATUS } from './event-status.enum';

@Controller('api/v1/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get("")
  getEvents(@Query('status') status: STATUS) {
    return this.eventService.getEvents(status);
  }
}
