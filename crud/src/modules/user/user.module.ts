import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)], // Register User entity here
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService], // Export the UserService to be used by other modules
})
export class UserModule {}
