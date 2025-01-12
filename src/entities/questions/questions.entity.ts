import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column('text')
  description: string;

  @Column({ type: 'int', default: 0 })
  rating: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
