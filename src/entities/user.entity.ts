import { Column, PrimaryGeneratedColumn, Entity, Unique, OneToMany, OneToOne } from 'typeorm';
import { IUser } from '@/interfaces/IUser.interface';
import { ERole } from '@/enum/ERole.enum';
import { EUserStatus } from '@/enum/EUserStatus.enum';
import { Response } from '@/entities/response.entity';
import bcryptjs from 'bcryptjs'
import { UserPosition } from './userPosition.interface';

@Entity()
@Unique(['phone', 'role'])
export class User implements IUser {
	@PrimaryGeneratedColumn()
	id!: number

	@Column()
	displayName!: string

	@Column()
	phone!: string

	@Column({ nullable: true })
	email!: string

	@Column({ nullable: true })
	password!: string

	@Column({ nullable: true })
	avatar!: string

	@Column({ type: "timestamp", nullable: true })
	birthday!: string

	@Column()
	role!: ERole

	@Column({ nullable: true })
	avgRating!: number

	@Column({ nullable: true })
	ratingCount!: number

	@Column({ nullable: true })
	identifyingNumber!: string

	@Column({ default: EUserStatus.ACTIVE })
	status!: EUserStatus

	@OneToMany(() => Response, response => response.performer)
	responses!: Response[];

	@OneToOne(() => UserPosition, lastPosition => lastPosition.user)
	lastPosition!: UserPosition;

	hashPassword(): void {
		const salt = bcryptjs.genSaltSync(10);
		this.password = bcryptjs.hashSync(this.password, salt);
	}
}
