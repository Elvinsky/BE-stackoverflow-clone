import { Controller, Get } from '@nestjs/common';
import { TagService } from './tags.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getAllTags() {
    return this.tagService.findAll();
  }
}
