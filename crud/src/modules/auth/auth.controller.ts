/* eslint-disable prettier/prettier */
import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.services';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async validateUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      if (!email || !password) {
        throw new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Email and password are required',
          },
          HttpStatus.BAD_REQUEST,
        );
      }

      const result = await this.authService.login(email, password);
      return {
        statusCode: HttpStatus.OK,
        message: 'Login successful',
        data: result,
      };
    } catch (error) {
      if (error.status === HttpStatus.UNAUTHORIZED) {
        throw new HttpException(
          {
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'Invalid email or password',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
      throw new HttpException(
        {
          statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'An error occurred during login',
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
