import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type InternationalProductDocument = InternationalProduct & Document;

@Schema({ collection: 'international_prod'})
export class InternationalProduct extends Document {

    @Prop()
    _id: string

    @Prop()
    title: string

    @Prop()
    startDate: string

    @Prop()
    endDate: string

    @Prop()
    standardPrice: number

    @Prop()
    area: string

    @Prop()
    image: string[]

    @Prop()
    detail: string

    @Prop()
    travelPoints: string

    @Prop(
        {
            type: [
                {
                    departureTime: {type: String, required: true},
                    arrivalTime: {type: String, required: true},
                    timeTaken: {type: String, required: true},
                    _id: false
    
                }
            ],
            default: []
        }
    )
    departureData : {
        departureTime: string
        arrivalTime: string
        timeTaken: string
    }

    @Prop(
        {
            type: [
                {
                    departureTime: {type: String, required: true},
                    arrivalTime: {type: String, required: true},
                    timeTaken: {type: String, required: true},
                    _id: false
    
                }
            ],
            default: []
        }
    )
    arrivalData : {
        departureTime: string
        arrivalTime: string
        timeTaken: string
    }

    @Prop()
    airline: string

    @Prop()
    status: string
}

export const InternationalProductSchema = SchemaFactory.createForClass(InternationalProduct);