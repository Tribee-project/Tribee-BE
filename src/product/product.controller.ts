import { Controller, Get, Query, Req } from '@nestjs/common';

import { ProductService } from './product.service';
import { AREA } from './enum/product.area.enum';

@Controller('/api/v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  getInternationalProducts(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('area1') area1?: AREA,
    @Query('area2') area2?: string,
    @Query('status') status?: string
  ){
    return this.productService.getInternationalProducts(startDate, endDate, area1, area2, status);
  }
}
