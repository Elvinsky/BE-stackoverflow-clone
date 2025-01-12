import { Controller, Get, Param } from '@nestjs/common';
import { QuestionService } from './questions.service';

@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Get()
  async getAllQuestions() {
    return this.questionService.findAll();
  }
}
