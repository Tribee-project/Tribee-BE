import { CATEGORY } from "../enum/reservation-category.enum";

export class CreateReservationDto {
    prodId: string;
    reservationDate: Date;
    departureDate: Date;
    cost: number;
    personnel: number;
    category: CATEGORY;
}