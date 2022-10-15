import { Entity, Column, PrimaryColumn, CreateDateColumn, BaseEntity, OneToMany } from 'typeorm';
import { Product } from './Product';

@Entity()
export class Category extends BaseEntity {
    @PrimaryColumn()
        uuid: string;

    @Column()
        name: string;

    @CreateDateColumn()
        createdAt: Date;

    @OneToMany(() => Product, product => product.category)
        products: Product[];
}