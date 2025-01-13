import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/CreateUser.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  getAllQuiz() {
    return this.userService.getAllUsers();
  }

  @Post('/create')
  @HttpCode(201)
  @UsePipes(ValidationPipe)
  async createUser(@Body() userData: CreateUserDto) {
    return await this.userService.createNewUser(userData);
  }

  @Get('/findByName/:username')
  async findUserByName(@Param('username') username: string) {
    return await this.userService.findUserByName(username);
  }

  @Get('/findByEmail')
  async findUsersByEmail(@Query('email') email: string) {
    return await this.userService.findUsersByEmail(email);
  }

  @Get('/paginated')
  async getPaginatedUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return await this.userService.getPaginatedUsers(page, limit);
  }
}
