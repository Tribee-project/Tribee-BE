import { Controller, Get, Query, Req } from '@nestjs/common';

import { ProductService } from './product.service';
import { AREA } from './enum/product.area.enum';
import { StringToArrayPipe } from 'src/common/pipe/string-to-array.pipe';
import { STATUS } from 'src/common/enum/data.stauts.enum';

@Controller('/api/v1/product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('')
  getInternationalProducts(
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('area1') area1?: AREA,
    @Query('area2') area2?: string,
    @Query('status') status?: STATUS
  ){
    return this.productService.getInternationalProducts(startDate, endDate, area1, area2, status);
  }

  @Get('/list')
  getInternationalProductById(@Query('id', StringToArrayPipe) id: string[]) {
    return this.productService.getInternationalProductById(id);
  }
}
