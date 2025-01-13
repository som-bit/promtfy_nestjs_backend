/* eslint-disable prettier/prettier */
import { DataSource, Repository } from 'typeorm';
import { Prompt } from './prompts.entity';

export class UserRepository extends Repository<Prompt> {
  constructor(dataSource: DataSource) {
    super(Prompt, dataSource.createEntityManager());
  }

  // Add custom methods here if needed
}
