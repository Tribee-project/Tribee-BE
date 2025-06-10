import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { Repository } from 'typeorm';
import { CreateReservationDto } from './dto/reservation-create';
import { UserInfoDto } from 'src/user/dto/user-info';
import { STATUS } from 'src/common/enum/data-stauts.enum';
import { InjectModel } from '@nestjs/mongoose';
import { TravelProduct } from 'src/product/product.document';
import { Model } from 'mongoose';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectModel(TravelProduct.name)
    private productModel: Model<TravelProduct>,
  ) {}

  async createReservation(user: any, dto: CreateReservationDto) {
    const { prodId, reservationDate, departureDate, cost, personnel } = dto;

    const userId = user.id;

    const reservation = this.reservationRepository.create({
      prodId,
      userId,
      reservationDate,
      departureDate,
      cost,
      personnel,
      isReviewed: false,
      status: 0,
    });

    await this.reservationRepository.save(reservation);
  }

  async getReservation(user: any) {
    const userId = user.id;

    const reservations =  await this.reservationRepository.find({
      where: { userId: userId },
      order: { reservationDate: 'DESC' },
    });

    const prodId = reservations.map(reservation => reservation.prodId);

    const products = await this.productModel.find({_id: {$in: prodId}}).exec();

    const productMap = new Map();
    products.forEach(product => {
      productMap.set(product._id, product);
    });

    const result = reservations.map(reservation => {
      const {prodId, ...reservationWithoutProd} = reservation;
      const product = productMap.get(prodId);

      return {
        ...reservationWithoutProd,
        product: product || null
      };
    });

    return result;
  }

  async cancledReservation(user: any, id: string) {
    const reservation = await this.reservationRepository.findOne({
      where: { id: id },
    });

    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }

    reservation.status = STATUS.CANCLED;

    await this.reservationRepository.save(reservation);
  }
}
