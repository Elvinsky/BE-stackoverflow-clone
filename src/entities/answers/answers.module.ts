import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './answers.entity';
import { AnswerService } from './answers.service';
import { AnswerController } from './answers.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
  providers: [AnswerService],
  controllers: [AnswerController],
})
export class AnswersModule {}
