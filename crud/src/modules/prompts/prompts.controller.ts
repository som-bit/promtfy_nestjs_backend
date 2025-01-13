/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePromptDto } from './dto/CreatePrompt.dto';
import { PromptService } from './prompts.services';

@Controller('prompts')
export class PromptController {
  constructor(private readonly promptService: PromptService) {}

  // Create a new prompt
  @Post('/create')
  @UsePipes(ValidationPipe)
  async createPrompt(@Body() createPromptDto: CreatePromptDto) {
    return await this.promptService.createPrompt(createPromptDto);
  }

  // Search prompts by username or email
  @Get('/searchByUser')
  async searchPromptsByUser(@Query('search') search: string) {
    return await this.promptService.searchPromptsByUser(search);
  }

  // Search prompts by tag
  @Get('/searchByTag')
  async searchPromptsByTag(@Query('tag') tag: string) {
    return await this.promptService.searchPromptsByTag(tag);
  }
}
