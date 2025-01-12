import { Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Question } from '../questions/questions.entity';
import { Tag } from '../tags/tags.entity';

@Entity('question_tags')
export class QuestionTag {
  @PrimaryColumn()
  question_id: number;

  @PrimaryColumn()
  tag_id: number;

  @ManyToOne(() => Question, (question) => question.id)
  @JoinColumn({ name: 'question_id' })
  question: Question;

  @ManyToOne(() => Tag, (tag) => tag.id)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;
}
