import { Column, PrimaryGeneratedColumn, Entity, OneToOne, JoinColumn } from 'typeorm';
import { IUserPosition } from '@/interfaces/IUserPosition.interface';
import { User } from './user.entity';

@Entity()
export class UserPosition implements IUserPosition {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    userId!: number

    @OneToOne(() => User, user => user.lastPosition)
    @JoinColumn({ name: 'userId' })
    user!: User;

    @Column({ type: "decimal", precision: 10, scale: 6, nullable: true })
    lat!: number

    @Column({ type: "decimal", precision: 10, scale: 6, nullable: true })
    lng!: number

    @Column({ type: "timestamp", nullable: true })
    time!: string
}
