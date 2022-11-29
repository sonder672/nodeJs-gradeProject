import { Entity, Column, PrimaryColumn, CreateDateColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './Category';
import { ProductImages } from './ProductImages';
import { Lead } from './Lead';

@Entity()
export class Product extends BaseEntity {
    @PrimaryColumn()
        uuid: string;

    @Column()
        name: string;

    @Column()
        available: boolean;

    @Column({ type: 'decimal' })
        price: number;

    @Column()
        stock: number;

    @CreateDateColumn()
        createdAt: Date;

    @ManyToOne(() => Category, category => category.products, { nullable: false })
        category: string;

    @OneToMany(() => ProductImages, productImages => productImages.product, { eager: true })
        images: ProductImages[];

    @OneToMany(() => Lead, lead => lead.product)
        leads: Lead[];
}