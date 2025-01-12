import { Controller, Get } from '@nestjs/common';
import { VoteService } from './votes.service';

@Controller('votes')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Get()
  async getAllVotes() {
    return this.voteService.findAll();
  }
}
