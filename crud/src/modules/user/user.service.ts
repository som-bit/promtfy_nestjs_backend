/* eslint-disable prettier/prettier */
import * as bcrypt from 'bcrypt';
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

  async createNewUser(userData: CreateUserDto) {
    try {
      const { email, password } = userData;
  
      // Check if the email is already in use
      const existingUser = await this.userRepository.findOne({ where: { email } });
      if (existingUser) {
        throw new HttpException(
          'Email already exists',
          HttpStatus.CONFLICT,
        );
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const newUser = this.userRepository.create({
        ...userData,
        password: hashedPassword,
      });
  
      // Save the user to the database
      const savedUser = await this.userRepository.save(newUser);
  
      // Remove the password before returning the response
      delete savedUser.password; // Ensure password is not included in the response
  
      return savedUser;
    } catch (error) {
      if (error.status === HttpStatus.CONFLICT) throw error;
  
      throw new HttpException(
        'Failed to create user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  

  async validateUser(email: string, password: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      if (!user) {
        throw new HttpException(
          'Invalid email or password',
          HttpStatus.UNAUTHORIZED,
        );
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new HttpException(
          'Invalid email or password',
          HttpStatus.UNAUTHORIZED,
        );
      }

      // Return the user object or generate a JWT (handled in AuthService)
      return user;
    } catch (error) {
      throw error;
    }
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
