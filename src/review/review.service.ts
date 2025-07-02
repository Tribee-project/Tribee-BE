import { ConflictException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { In, Repository } from 'typeorm';
import { CreateReviewDto } from './dto/review-create';
import { Reservation } from 'src/reservation/reservation.entity';
import { User } from 'src/user/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { TravelProduct } from 'src/product/product.document';
import { Model } from 'mongoose';
import { TourTicketProduct } from 'src/tour-ticket/tour-ticket.document';
import { CATEGORY } from 'src/reservation/enum/reservation-category.enum';
import { UpdateReviewDto } from './dto/review-update';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository:Repository<Review>,
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>,
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectModel(TravelProduct.name)
        private travelProductModel: Model<TravelProduct>,
        @InjectModel(TourTicketProduct.name)
        private tourTicketModel: Model<TourTicketProduct>
    ) {}

    async createReview(user:any, dto: CreateReviewDto) {
        const {reserveId, content} = dto;
        const userId = user.id;

        const reservation = await this.reservationRepository.findOne({
            where: {id: reserveId}
        })

        if (reservation.isReviewed) throw new ConflictException('Already Reviewed')

        const review = this.reviewRepository.create({
            userId,
            reserveId,
            prodId: reservation.prodId,
            content
        });

        await this.reviewRepository.save(review);

        reservation.isReviewed = true;

        await this.reservationRepository.save(reservation);
    }

    async getReview(user: any) {
        const userId = user.id;

        const reviewList =  await this.reviewRepository.find({
            where: {userId : userId},
            order: {createdAt: 'desc'}
        });

        const reserveId = reviewList.map(review => review.reserveId);    
        const reservations = await this.reservationRepository.find({where: {id :In(reserveId)}})
        const reserveMap = new Map(reservations.map(reservation => [reservation.id, reservation]));

        const tourTicketProdIds: string[] = [];
        const travelProdIds: string[] = [];

        reservations.forEach(reservation => {
            if (reservation.category === CATEGORY.TOUR_TICKET) {
                tourTicketProdIds.push(reservation.prodId);
            } else if (reservation.category === CATEGORY.PACKAGE) {
                travelProdIds.push(reservation.prodId);
            }
        });

        const [tourTicketProduct, travelProduct] = await Promise.all([
            this.tourTicketModel.find({_id: {$in: tourTicketProdIds}}).exec(),
            this.travelProductModel.find({ _id: {$in: travelProdIds}}),
        ]);
    
        const tourTicketMap = new Map(tourTicketProduct.map(t => [t.id, t.title]));
        const travelMap = new Map(travelProduct.map(p => [p.id, p.title]));

        const result = reviewList.map(review => {
            const {reserveId, ...reviewWithout} = review;
            const reservation = reserveMap.get(reserveId) || null;

            let product = null;
            if (reservation) {
                if (reservation.category === CATEGORY.PACKAGE) {
                    product = travelMap.get(reservation.prodId) || null
                }
                if (reservation.category === CATEGORY.TOUR_TICKET) {
                    product = tourTicketMap.get(reservation.prodId) || null
                }
            }

            return {
                ...reviewWithout,
                reservation: reservation || null,
                productTitle: product || null
            }
        })

        return result;

    }

    async getProdReview(prodId: string) {
        const reviewList =  await this.reviewRepository.find({
            where: {prodId: prodId},
            order: {createdAt: 'desc'}
        });

        const userId = reviewList.map(review => review.userId);
        const reserveId = reviewList.map(review => review.reserveId);
        
        const [users, reservations] = await Promise.all([
            this.userRepository.find({where: {id: In(userId)}}),
            this.reservationRepository.find({where: {id :In(reserveId)}})
        ])

        const userMap = new Map(users.map(user => [user.id, user.nickname]));
        const reserveMap = new Map(reservations.map(reservation => [reservation.id, reservation]));

        const tourTicketProdIds: string[] = [];
        const travelProdIds: string[] = [];

        reservations.forEach(reservation => {
            if (reservation.category === CATEGORY.TOUR_TICKET) {
                tourTicketProdIds.push(reservation.prodId);
            } else if (reservation.category === CATEGORY.PACKAGE) {
                travelProdIds.push(reservation.prodId);
            }
        });

        const [tourTicketProduct, travelProduct] = await Promise.all([
            this.tourTicketModel.find({_id: {$in: tourTicketProdIds}}).exec(),
            this.travelProductModel.find({ _id: {$in: travelProdIds}}),
        ]);
    
        const tourTicketMap = new Map(tourTicketProduct.map(t => [t.id, t.title]));
        const travelMap = new Map(travelProduct.map(p => [p.id, p.title]));

        const result = reviewList.map(review => {
            const {userId, reserveId, ...reviewWithout} = review;
            const nickname = userMap.get(userId) || null;
            const reservation = reserveMap.get(reserveId) || null;

            let product = null;
            if (reservation) {
                if (reservation.category === CATEGORY.PACKAGE) {
                    product = travelMap.get(reservation.prodId) || null
                }
                if (reservation.category === CATEGORY.TOUR_TICKET) {
                    product = tourTicketMap.get(reservation.prodId) || null
                }
            }

            return {
                ...reviewWithout,
                nickname: nickname ||null,
                reservation: reservation || null,
                productTitle: product || null
            }
        })

        return result;
    }

    async updateReview(user: any, dto: UpdateReviewDto) {
        const {reviewId, content} = dto;
        
        const review = await this.reviewRepository.findOne({
            where: {id: reviewId}
        });

        if (!review) throw new NotFoundException('Not Valid ReviewId');

        if (review.userId !== user.id) {
            throw new ForbiddenException('No permission');
        }

        review.content = content;

        await this.reviewRepository.save(review);
    }
}
