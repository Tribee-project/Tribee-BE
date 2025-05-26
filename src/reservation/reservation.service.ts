import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/reservation-create';
import { UserInfoDto } from 'src/user/dto/user-info';

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>
    ){}

    async createReservation(user: any, dto: CreateReservationDto) {
        const {prodId, reservationDate, departureDate, cost, personnel} = dto;

        const userId = user.id;

        const reservation = this.reservationRepository.create({
            prodId,
            userId,
            reservationDate,
            departureDate,
            cost,
            personnel,
            status: "ACTIVE"
        })

        await this.reservationRepository.save(reservation);
    }
}
