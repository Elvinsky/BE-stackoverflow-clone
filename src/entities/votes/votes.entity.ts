import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { VoteType } from 'src/constants/enums/votes.enum';
import { Question } from '../questions/questions.entity';
import { Answer } from '../answers/answers.entity';

@Entity('votes')
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'enum', enum: VoteType })
  type: VoteType;

  @Column({ type: 'smallint' })
  vote_value: number;

  @ManyToOne(() => Question, (question) => question.id, { nullable: true })
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @ManyToOne(() => Answer, (answer) => answer.id, { nullable: true })
  @JoinColumn({ name: 'answer_id' })
  answer: Answer;

  @CreateDateColumn()
  created_at: Date;
}
