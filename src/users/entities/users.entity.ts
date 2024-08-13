import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    login: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    constructor(user: Partial<Users>) {
        Object.assign(this, user);
    }
}
