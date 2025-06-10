import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";

@Entity()
export class Review extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    userId: string

    @Column()
    reserveId: string

    @Column()
    prodId: string
    
    @Column()
    content: string

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}