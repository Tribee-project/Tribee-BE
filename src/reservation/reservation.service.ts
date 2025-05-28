import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/reservation-create';
import { UserInfoDto } from 'src/user/dto/user-info';
import { STATUS } from 'src/common/enum/data.stauts.enum';

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
            status: 0
        })

        await this.reservationRepository.save(reservation);
    }

    async getReservation(user:any) {
        const userId = user.id;

        return await this.reservationRepository.find({
            where : {userId: userId},
            order: {reservationDate: 'DESC'}
        })
    }

    async cancledReservation(user: any, id: string) {
        const reservation = await this.reservationRepository.findOne({
            where : {id: id}
        })

        if (!reservation) {
            throw new NotFoundException('Reservation not found');
          }

        reservation.status = STATUS.CANCLED;

        await this.reservationRepository.save(reservation);
    }
}
