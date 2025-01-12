import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './questions.entity';
import { QuestionService } from './questions.service';
import { QuestionController } from './questions.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  providers: [QuestionService],
  controllers: [QuestionController],
})
export class QuestionsModule {}
