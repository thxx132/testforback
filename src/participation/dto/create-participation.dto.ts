// src/participation/dto/create-participation.dto.ts

import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateParticipationDto {
  @IsInt()
  @IsNotEmpty()
  postId: number;

  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
