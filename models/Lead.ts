import { Entity, Column, ManyToOne, BaseEntity, PrimaryColumn } from 'typeorm';
import { Product } from './Product';

@Entity()
export class Lead extends BaseEntity {
    @PrimaryColumn()
        uuid: string;

    @Column()
        quantity: number;

    @ManyToOne(() => Product, product => product.leads, { nullable: false, eager: true })
        product: string;
}