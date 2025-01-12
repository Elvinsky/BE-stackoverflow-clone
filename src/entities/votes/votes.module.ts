import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './votes.entity';
import { VoteService } from './votes.service';
import { VoteController } from './votes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Vote])],
  providers: [VoteService],
  controllers: [VoteController],
})
export class VotesModule {}
