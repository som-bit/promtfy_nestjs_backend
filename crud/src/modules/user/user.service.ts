/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>, // Use the Repository<User> directly
  ) {}

  getAllUsers() {
    return this.userRepository.find(); // Fetch all users from the database
  }

  async createNewUser(user: CreateUserDto) {
    const newUser = this.userRepository.create(user); // Create a new user instance
    return await this.userRepository.save(newUser); // Save the user to the database
  }
  async findUserByName(name: string) {
    const user = await this.userRepository.findOne({ where: { username: name } }); // Adjust field to match your User entity
  
    if (!user) {
      throw new NotFoundException(`User with username "${name}" not found`);
    }
  
    return user;
  }

  async findUsersByEmail(email: string) {
    const users = await this.userRepository.find({
      where: { email: Like(`%${email}%`) }, // Use the Like operator for partial matches
    });
  
    if (!users || users.length === 0) {
      // Custom error response with different status code
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          message: `No users found with email containing "${email}"`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  
    return users;
  }

  async getPaginatedUsers(page: number, limit: number) {
    return await this.userRepository.find({
      skip: (page - 1) * limit,
      take: limit,
    });
  }
  
  
}
