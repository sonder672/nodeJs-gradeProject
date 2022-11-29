import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class CustomGarments extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
        id: number;

    @Column()
        namePersonalization: string;

    @Column({ nullable: true })
        description: string;

    @Column()
        status: boolean;

    @CreateDateColumn()
        createdAt: Date;

    @ManyToOne(() => User, user => user.customizations, { nullable: true })
        user: string;
}