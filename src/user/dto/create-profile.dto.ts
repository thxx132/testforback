// src/user/dto/create-profile.dto.ts

import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsOptional()
  profileImageUrl?: string;
}
