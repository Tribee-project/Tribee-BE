import { Controller, Get, Param, ParseIntPipe, Query, Req } from '@nestjs/common';

import { ProductService } from './product.service';
import { AREA } from './enum/product-area.enum';
import { StringToArrayPipe } from 'src/common/pipe/string-to-array.pipe';
import { STATUS } from 'src/common/enum/data-stauts.enum';
import { CATEGORY } from './enum/product-category.enum';

@Controller('/api/v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  getTravelProducts(
    @Query('category') category?: CATEGORY,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('travelDays',new ParseIntPipe({optional: true})) travelDays?: number, // query는 기본적으로 string
    @Query('area1') area1?: AREA,
    @Query('area2') area2?: string,
    @Query('status') status?: STATUS,
  ) {
    return this.productService.getTravelProducts(
      category,
      startDate,
      endDate,
      travelDays,
      area1,
      area2,
      status,
    );
  }

  @Get('/single/:id')
  getTravelProductById(@Param('id') id: string) {
    return this.productService.getTravelProductById(id);
  }
}
