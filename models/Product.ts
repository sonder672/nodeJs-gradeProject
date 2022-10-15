import { Entity, Column, PrimaryColumn, CreateDateColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Category } from './Category';

@Entity()
export class Product extends BaseEntity {
    @PrimaryColumn()
        uuid: string;

    @Column()
        name: string;

    @Column()
        available: boolean;

    @Column()
        price: number;

    @Column()
        stock: number;

    @CreateDateColumn()
        createdAt: Date;

    @ManyToOne(() => Category, category => category.products, { nullable: false })
        category: string;
}