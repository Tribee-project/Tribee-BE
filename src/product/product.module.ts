import { Module } from '@nestjs/common';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TravelProduct, TravelProductSchema } from './product.document';
import { MongoClientModule } from 'src/config/mongo.client.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TravelProduct.name, schema: TravelProductSchema },
    ]),
    MongoClientModule
  ],
  providers: [ProductService],
  controllers:[ProductController]
})
export class ProductModule {}
