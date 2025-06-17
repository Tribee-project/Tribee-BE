import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './reservation.entity';
import { In, Repository } from 'typeorm';
import { CreateReservationDto } from './dto/reservation-create';
import { UserInfoDto } from 'src/user/dto/user-info';
import { STATUS } from 'src/common/enum/data-stauts.enum';
import { InjectModel } from '@nestjs/mongoose';
import { TravelProduct } from 'src/product/product.document';
import { Model } from 'mongoose';
import { TourTicketProduct } from 'src/tour-ticket/tour-ticket.document';
import { CATEGORY } from './enum/reservation-category.enum';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    @InjectModel(TravelProduct.name)
    private travelProductModel: Model<TravelProduct>,
    @InjectModel(TourTicketProduct.name)
    private tourTicketProductModel: Model<TourTicketProduct>
  ) {}

  async createReservation(user: any, dto: CreateReservationDto) {
    const { prodId, reservationDate, departureDate, cost, personnel, category } = dto;

    const userId = user.id;

    const reservation = this.reservationRepository.create({
      prodId,
      userId,
      reservationDate,
      departureDate,
      cost,
      personnel,
      isReviewed: false,
      category: category,
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

    const travelProdId = reservations
    .filter(reservation => reservation.category === CATEGORY.PACKAGE)
    .map(reservation => reservation.prodId);

    const tourticketProdId = reservations
    .filter(reservation => reservation.category === CATEGORY.TOUR_TICKET)
    .map(reservation => reservation.prodId);

    const travelProducts = await this.travelProductModel.find({_id: {$in: travelProdId}}).exec();
    const tourticketProducts = await this.tourTicketProductModel.find({_id: {$in: tourticketProdId}});

    const travelProductMap = new Map();
    travelProducts.forEach(product => {
      travelProductMap.set(product._id, product);
    });
    const tourTicketProuctMap = new Map();
    tourticketProducts.forEach(product => {
      tourTicketProuctMap.set(product._id, product);
    })

    const result = reservations.map(reservation => {
      const {prodId, category, ...reservationWithoutProd} = reservation;
      let product = null;
      
      if (category === CATEGORY.PACKAGE) {
        product = travelProductMap.get(prodId) || null;
      } else if (category === CATEGORY.TOUR_TICKET) {
        product = tourTicketProuctMap.get(prodId) || null;
      }

      return {
        ...reservationWithoutProd,
        product: product || null,
        category: category || null
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
