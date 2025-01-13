/* eslint-disable prettier/prettier */
import {
  IsNotEmpty,
  IsEmail,
  IsOptional,
  Length,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'The username should not be empty' })
  @Length(8, 20, {
    message: 'Username must be between 8 and 20 characters.',
  })
  @Matches(/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, {
    message:
      'Username invalid, it should contain 8-20 alphanumeric letters and be unique.',
  })
  username: string;

  @IsNotEmpty({ message: 'Email is required.' })
  @IsEmail({}, { message: 'Invalid email address.' })
  email: string;

  @IsOptional()
  @IsNotEmpty({ message: 'Image URL cannot be empty if provided.' })
  image: string;



  @IsNotEmpty()
  @MinLength(6) // Ensure password has a minimum length
  password: string;
}
