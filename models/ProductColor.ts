import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { ProductImages } from './ProductImages';

@Entity()
export class ProductColor extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
        id: number;

    @Column()
        colorName: string;

    @Column()
        hexadecimalCode: string;

    @OneToMany(() => ProductImages, images => images.color, { nullable: true })
        image: ProductImages[];
}