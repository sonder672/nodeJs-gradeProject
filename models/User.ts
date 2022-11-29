import { Entity, Column, PrimaryColumn, CreateDateColumn, BaseEntity, ManyToOne, OneToMany } from 'typeorm';
import { Role } from './Role';
import { CustomGarments } from './CustomGarments';

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

    @ManyToOne(() => Role, role => role.user, { nullable: false, eager: true })
        role: number;

    @OneToMany(() => CustomGarments, customGarments => customGarments.user)
        customizations: CustomGarments[];
}