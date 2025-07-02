import { Body, Controller, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';

import { ReviewService } from './review.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateReviewDto } from './dto/review-create';
import { UpdateReviewDto } from './dto/review-update';

@Controller('/api/v1/review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createReview(@Req()req: any, @Body()dto: CreateReviewDto) {
    return this.reviewService.createReview(req.user, dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getReview(@Req()req: any) {
    return this.reviewService.getReview(req.user);
  }

  @Get('/:prodId')
  getProdReview(@Param('prodId') prodId: string) {
    return this.reviewService.getProdReview(prodId);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  updateReview(@Req()req: any, @Body()dto: UpdateReviewDto) {
    return this.reviewService.updateReview(req.user, dto)
  }


}
