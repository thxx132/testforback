import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class AuthUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(1)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(5, {
    message: 'Password must be longer than 5',
  })
  @Matches(/^[a-zA-Z0-9_]+$/, {
    message: 'Password only accepts english and number',
  })
  password: string;
}
