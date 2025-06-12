import { Module } from '@nestjs/common';
import { DynamicPriceService } from './dynamic-price.service';
import { DynamicPriceController } from './dynamic-price.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DynamicPrice } from './dynamic-price.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelProduct, TravelProductSchema } from 'src/product/product.document';

@Module({
  imports: [
    TypeOrmModule.forFeature([DynamicPrice]),
    MongooseModule.forFeature([
      { name: TravelProduct.name, schema: TravelProductSchema },
    ]),
  ],
  controllers: [DynamicPriceController],
  providers: [DynamicPriceService],
})
export class DynamicPriceModule {}
