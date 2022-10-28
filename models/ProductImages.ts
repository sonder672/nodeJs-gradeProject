import { Entity, Column, ManyToOne, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Product } from './Product';

@Entity()
export class ProductImages extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
        id: number;

    @Column()
        imageName: string;

    @ManyToOne(() => Product, product => product.images, { nullable: false })
        product: string;
}