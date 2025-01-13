/* eslint-disable prettier/prettier */
import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.services';
import { UserModule } from '../user/user.module'; // Import UserModule to access UserService
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config(); // Import JwtModule

@Module({
  
  imports: [
    forwardRef(() => UserModule), // Use forwardRef to avoid circular dependency
    JwtModule.register({
      secret:  process.env.JWT_SECRET_KEY, // Your JWT secret (use environment variable for security)
      signOptions: { expiresIn: '1h' }, // Set default expiry for JWT token
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService], // Export AuthService so it can be used in other modules

})
export class AuthModule {}
