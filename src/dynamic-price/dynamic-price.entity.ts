import { Column, Double, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DynamicPrice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    selectDate: string;

    @Column({type: 'double precision'})
    extraRatio: number;
}
