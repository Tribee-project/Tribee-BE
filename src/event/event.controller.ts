import { Controller, Get, Param, Query } from '@nestjs/common';

import { EventService } from './event.service';
import { STATUS } from './event-status.enum';

@Controller('api/v1/event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get("")
  getEvents(@Query('status') status: STATUS) {
    return this.eventService.getEvents(status);
  }

  @Get("/:id")
  getEvent(@Param('id') id: string) {
    return this.eventService.getEvent(id);
  }
}
