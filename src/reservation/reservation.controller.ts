import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';

import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/reservation-create';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('/api/v1/reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createReservation(@Req()req: any, @Body()dto: CreateReservationDto ) {
    return this.reservationService.createReservation(req.user, dto);
  }
}
