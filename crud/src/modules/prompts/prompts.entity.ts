/* eslint-disable prettier/prettier */
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('prompts')
export class Prompt extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'Unique identifier for the prompt',
  })
  id: number;

  @ManyToOne(() => User, (user) => user.prompts, { eager: true })
  @JoinColumn({ name: 'creator_id' })
  creator: User;

  @Column({
    type: 'text',
    nullable: false,
    comment: 'The content of the prompt',
  })
  prompt: string;

  @Column({
    type: 'varchar',
    nullable: false,
    comment: 'The tag associated with the prompt',
  })
  tag: string;
}
