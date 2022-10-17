import { Entity, Column, PrimaryColumn, CreateDateColumn, BaseEntity } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    @PrimaryColumn()
        uuid: string;

    @Column()
        name: string;

    @Column()
        lastName: string;

    @Column({unique: true})
        email: string;

    @Column()
        password: string;

    @CreateDateColumn()
        createdAt: Date;
}