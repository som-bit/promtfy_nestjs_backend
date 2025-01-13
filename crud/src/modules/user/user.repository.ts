/* eslint-disable prettier/prettier */
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  // Add custom methods here if needed
}
