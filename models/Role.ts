import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './User';

@Entity()
export class Role {
    @PrimaryGeneratedColumn('increment')
        id: number;

    @Column()
        nameRole: string;

    @OneToMany(() => User, user => user.role, { nullable: false })
        user: User[];
}