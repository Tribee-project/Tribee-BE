import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DynamicPriceService } from './dynamic-price.service';

@Controller('/api/v1/price')
export class DynamicPriceController {
  constructor(private readonly dynamicPriceService: DynamicPriceService) {} 

  @Get()
  getDynamicPrice(
    @Query('prodId') prodId: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ){
    return this.dynamicPriceService.getDynamicPrice(prodId, startDate, endDate);
  }
  
  }
