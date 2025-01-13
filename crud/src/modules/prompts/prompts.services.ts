/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Prompt } from './prompts.entity';
import { User } from '../user/user.entity';
import { CreatePromptDto } from './dto/CreatePrompt.dto';

@Injectable()
export class PromptService {
  constructor(
    @InjectRepository(Prompt)
    private readonly promptRepository: Repository<Prompt>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Create a new prompt
  async createPrompt(createPromptDto: CreatePromptDto): Promise<Prompt> {
    const { creatorId, prompt, tag } = createPromptDto;

    const creator = await this.userRepository.findOne({
      where: { id: creatorId },
    });
    if (!creator) {
      throw new NotFoundException(`User with ID ${creatorId} not found`);
    }

    const newPrompt = this.promptRepository.create({ creator, prompt, tag });
    return await this.promptRepository.save(newPrompt);
  }

// Search prompts by username or email
async searchPromptsByUser(search: string): Promise<Prompt[]> {
    const prompts = await this.promptRepository.find({
      where: [
        { creator: { username: Like(`%${search}%`) } },
        { creator: { email: Like(`%${search}%`) } },
      ],
    });
  
    if (!prompts || prompts.length === 0) {
      throw new NotFoundException(`No prompts found for user: "${search}"`);
    }
  
    return prompts;
  }
  

// Search prompts by tag
async searchPromptsByTag(tag: string): Promise<Prompt[]> {
    const prompts = await this.promptRepository.find({
      where: { tag: Like(`%${tag}%`) },
    });
  
    if (!prompts || prompts.length === 0) {
      throw new NotFoundException(`No prompts found with tag: "${tag}"`);
    }
  
    return prompts;
  }
  
}
