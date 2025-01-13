/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, } from 'class-validator';

export class CreatePromptDto {
  creatorId: number;

  @IsNotEmpty()
  @IsString()
  prompt: string;

  @IsNotEmpty()
  @IsString()
  tag: string;
}
