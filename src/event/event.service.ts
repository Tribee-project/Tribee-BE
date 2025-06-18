import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { STATUS } from './event-status.enum';

@Injectable()
export class EventService {
    constructor(
        @InjectModel(Event.name)
        private eventModel: Model<Event>
    ){}

    async getEvents (status: STATUS) {
        if (status) {
            return await this.eventModel.find({status: status}).exec();
        }

        return await this.eventModel.find().exec();
    }
}
