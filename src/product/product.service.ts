import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InternationalProduct } from './product.document';
import { Model } from 'mongoose';
import { AREA } from './enum/product.area.enum';
import { STATUS } from 'src/common/enum/data.stauts.enum';

@Injectable()
export class ProductService {
    constructor(
        @InjectModel(InternationalProduct.name)
        private productModel: Model<InternationalProduct>
    ) {}

    async getInternationalProducts(startDate: string, endDate: string, area1: AREA, area2: string, status: STATUS) {
        const conditions: any = {};

        if (startDate) {
                conditions.endDate = {$gte: startDate};
        }

        if (endDate) {
            conditions.startDate = {$lte: endDate};
        }

        if (area1) {
            conditions.area = {$in: AREA.detailMap[area1]};
        }

        if (area2) {
            conditions.area = area2;
        }

        if (status) {
            conditions.status = status;
        }
        
        return await this.productModel.find(conditions).exec();
    }

    async getInternationalProductById(id: string[]) {
        return await this.productModel.find({_id: {$in: id}}).exec();
    }
}
