import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DynamicPrice } from './dynamic-price.entity';
import { Between, Repository } from 'typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { TravelProduct } from 'src/product/product.document';
import { Model } from 'mongoose';
import { PriceInfo } from './dto/dynamic-price-info';

@Injectable()
export class DynamicPriceService {
    constructor(
        @InjectRepository(DynamicPrice)
        private dynamicPriceRepository: Repository<DynamicPrice>,
        @InjectModel(TravelProduct.name)
        private productModel: Model<TravelProduct>,
    ) {}

    async getDynamicPrice (prodId: string, startDate: string, endDate: string) : Promise<PriceInfo[]> {
        const DynamicPriceData = await this.dynamicPriceRepository.find({
            where: {
                selectDate: Between(startDate, endDate)
            }
        });

        const product = await this.productModel.findById(prodId).select('standardPrice').lean();
        const standardPrice: number = Number(product?.standardPrice);

        return DynamicPriceData.map((data) => {
            const price = Math.round(standardPrice * data.extraRatio / 100) * 100;
            return {
                selectDate: data.selectDate,
                price: price
            }
        })
    }
}
