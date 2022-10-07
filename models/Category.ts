import { Entity, Column, PrimaryColumn, CreateDateColumn, BaseEntity } from 'typeorm';

@Entity()
export class Category extends BaseEntity {
    @PrimaryColumn()
        uuid: string;

    @Column()
        name: string;

    @CreateDateColumn()
        createdAt: Date;
}