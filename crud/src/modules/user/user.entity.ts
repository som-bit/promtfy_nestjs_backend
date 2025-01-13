/* eslint-disable prettier/prettier */
import {
  Entity,
  BaseEntity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { Prompt } from '../prompts/prompts.entity';

@Entity('users')
@Unique(['email']) // Ensures email uniqueness
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'The user unique identifier',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: 20, // Matches the 8-20 character requirement for username
    nullable: false,
    comment: 'The username of the user',
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    comment: 'The email of the user',
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: true,
    comment: 'The profile image URL of the user',
  })
  image: string;


  @Column({
    type: 'varchar',
    nullable: false,
    comment: 'The password of the user',
  })
  password: string; // Password field for authentication

  @OneToMany(() => Prompt, (prompt) => prompt.creator)
  prompts: Prompt[]; // Establishes a one-to-many relationship
}
