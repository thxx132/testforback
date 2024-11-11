// src/user/dto/update-profile.dto.ts

import { IsString, IsOptional } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  nickname?: string;

  @IsString()
  @IsOptional()
  profileImageUrl?: string;
}
