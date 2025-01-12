import { Controller, Get, Param } from '@nestjs/common';
import { AnswerService } from './answers.service';

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Get()
  async getAllAnswers() {
    return this.answerService.findAll();
  }
}
