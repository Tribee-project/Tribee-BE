import { Module } from '@nestjs/common';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { InternationalProduct, InternationalProductSchema } from './product.document';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: InternationalProduct.name, schema: InternationalProductSchema },
    ]),
  ],
  providers: [ProductService],
  controllers:[ProductController]
})
export class ProductModule {}
