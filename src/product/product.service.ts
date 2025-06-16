import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TravelProduct } from './product.document';
import { Model } from 'mongoose';
import { AREA } from './enum/product-area.enum';
import { STATUS } from 'src/common/enum/data-stauts.enum';
import { CATEGORY } from './enum/product-category.enum';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(TravelProduct.name)
    private productModel: Model<TravelProduct>,
  ) {}

  async getTravelProducts(
    category: CATEGORY,
    startDate: string,
    endDate: string,
    area1: AREA,
    area2: string,
    status: STATUS,
  ) {
    const conditions: any = {};

    if (category) {
      conditions.category = category;
    }

    if (startDate) {
      conditions.endDate = { $gte: startDate };
    }

    if (endDate) {
      conditions.startDate = { $lte: endDate };
    }

    if (area1) {
      conditions.area = { $in: AREA.detailMap[area1] };
    }

    if (area2) {
      conditions.area = area2;
    }

    if (status) {
      conditions.status = status;
    }

    return await this.productModel.find(conditions).exec();
  }

  async getTravelProductById(id: string) {
    return await this.productModel.findOne({ _id: id }).exec();
  }
}
