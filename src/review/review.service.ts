import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/review-create';
import { Reservation } from 'src/reservation/reservation.entity';

@Injectable()
export class ReviewService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository:Repository<Review>,
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>
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

        return await this.reviewRepository.find({
            where: {userId : userId},
            order: {createdAt: 'desc'}
        })
    }

    async getProdReview(prodId: string) {
        return await this.reviewRepository.find({
            where: {prodId: prodId},
            order: {createdAt: 'desc'}
        })
    }
}
