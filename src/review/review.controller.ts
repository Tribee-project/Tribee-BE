import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { ReviewService } from './review.service';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { CreateReviewDto } from './dto/review-create';

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
}
