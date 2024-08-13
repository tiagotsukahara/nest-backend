import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export default class Groups {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    constructor(group: Partial<Groups>) {
        Object.assign(this, group);
    }
}
