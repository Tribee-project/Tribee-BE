import { Module } from '@nestjs/common';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelProduct, TravelProductSchema } from './product.document';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TravelProduct.name, schema: TravelProductSchema },
    ]),
  ],
  providers: [ProductService],
  controllers:[ProductController]
})
export class ProductModule {}
