/* eslint-disable prettier/prettier */
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(email: string, password: string) {
    // Validate input
    if (!email || !password) {
      throw new BadRequestException('Email and password are required');
    }

    // Validate the user
    const user = await this.userService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate JWTs
    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    // Return a well-structured response
    return {
      statusCode: 200,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
        tokens: {
          accessToken,
          refreshToken,
        },
      },
    };
  }
}
