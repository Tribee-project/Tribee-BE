import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { STATUS } from "./event-status.enum";
import { Document } from "mongoose";

export type EventDocument = Event & Document;

@Schema({collection: 'event'})
export class Event extends Document {
    @Prop()
    _id: string;

    @Prop()
    title: string;

    @Prop()
    startDate: Date;

    @Prop()
    endDate: Date;

    @Prop()
    image: string;

    @Prop()
    detailContent: string

    @Prop()
    detailImage: string[]

    @Prop()
    status: STATUS

}

export const EventSchema = SchemaFactory.createForClass(Event);