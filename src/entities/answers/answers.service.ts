import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Answer } from './answers.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>
  ) {}

  async findAll(): Promise<Answer[]> {
    return this.answerRepository.find();
  }
}
