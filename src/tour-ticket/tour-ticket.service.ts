import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TourTicketProduct } from './tour-ticket.document';
import { Model } from 'mongoose';
import { CATEGORY } from './enum/tour-ticket-category.enum';

@Injectable()
export class TourTicketService {
    constructor(
        @InjectModel(TourTicketProduct.name)
        private productModel: Model<TourTicketProduct>
    ){}

    async getTourTicketProduct (category: CATEGORY) {
        if (category) {
            return await this.productModel.find({category: category}).exec();
        }

        return await this.productModel.find().exec();
    }

    async getTourTicketProductById (id: string) {
        return await this.productModel.findOne({_id: id}).exec();
    }
}
