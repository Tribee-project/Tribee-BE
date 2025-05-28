import { Body, Controller, Get, Post, Put, Query, Req, UseGuards } from '@nestjs/common';

import { ReservationService } from './reservation.service';
import { CreateReservationDto } from './dto/reservation-create';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Controller('/api/v1/reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createReservation(@Req()req: any, @Body()dto: CreateReservationDto ) {
    return this.reservationService.createReservation(req.user, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getReservation(@Req()req: any) {
    return this.reservationService.getReservation(req.user);
  }

  @Put('/cancled')
  @UseGuards(JwtAuthGuard)
  cancledReservation(@Req()req: any, @Query('id') id: string) {
    return this.reservationService.cancledReservation(req.user, id);
  }
}
