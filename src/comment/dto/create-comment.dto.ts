// src/comment/dto/create-comment.dto.ts

import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsInt()
  @IsNotEmpty()
  postId: number;

  @IsString()
  @IsNotEmpty()
  content: string;
}
