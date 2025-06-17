import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { STATUS } from "src/common/enum/data-stauts.enum";
import { CATEGORY } from "./enum/tour-ticket-category.enum";
import { Document } from "mongoose";

export type TourTicketDocument = TourTicketProduct & Document; 

@Schema({ collection: 'tour_ticket_product'})
export class TourTicketProduct extends Document {
    @Prop()
    _id: string;

    @Prop()
    title: string;

    @Prop()
    price: number;

    @Prop()
    image: string[];

    @Prop()
    category: CATEGORY;

    @Prop()
    status: STATUS;

    @Prop()
    detailContent: string;

    @Prop()
    detailImage: string;
}

export const TourTicketSchema = SchemaFactory.createForClass(TourTicketProduct);