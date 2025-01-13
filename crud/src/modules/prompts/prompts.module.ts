/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/user.entity';
import { Prompt } from './prompts.entity';
import { PromptService } from './prompts.services';
import { PromptController } from './prompts.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Prompt, User])],
  providers: [PromptService],
  controllers: [PromptController],
})
export class PromptModule {}
