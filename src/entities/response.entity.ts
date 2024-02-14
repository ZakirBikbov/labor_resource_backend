import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Order } from '@/entities/order.entity';
import { User } from '@/entities/user.entity';
import { EResponseStatus } from '@/enum/EResponseStatus.enum';

@Entity()
@Index(['orderId', 'performerId'], { unique: true })
export class Response {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	performerId!: number;

	@ManyToOne(() => User, user => user.responses)
	@JoinColumn({ name: 'performerId' })
	performer!: User;

	@Column()
	orderId!: number;

	@ManyToOne(() => Order, order => order.responses)
	@JoinColumn({ name: 'orderId' })
	order!: Order;

	@Column({ type: 'timestamp', nullable: true })
	start!: string;

	@Column({ type: 'timestamp', nullable: true })
	end!: string;

	@Column({
		type: 'enum',
		enum: EResponseStatus,
		default: EResponseStatus.WAITING,
	})
	status!: EResponseStatus;

	@Column({ nullable: true })
	performerRating!: number;

	@Column({ nullable: true })
	customerRating!: number;
}
