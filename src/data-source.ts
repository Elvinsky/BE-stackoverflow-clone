import { DataSource } from 'typeorm';
import { User } from './entities/users/users.entity';
import { Vote } from './entities/votes/votes.entity';
import { Tag } from './entities/tags/tags.entity';
import { Question } from './entities/questions/questions.entity';
import { QuestionTag } from './entities/question-tags/question-tags.entity';
import { Answer } from './entities/answers/answers.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'postgres-db',
  port: 5432,
  password: 'password',
  username: 'user',
  database: 'mydb',
  entities: [User, Vote, Tag, Question, QuestionTag, Answer],
  migrations: [__dirname + '/migrations/*.ts'],
  synchronize: false,
  logging: true,
});
