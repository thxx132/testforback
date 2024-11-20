// src/post/post.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  // 모든 게시글 조회
  async getAllPosts() {
    return this.prisma.post.findMany();
  }

  // 특정 게시글 조회
  async getPostById(id: number) {
    const post = await this.prisma.post.findUnique({ where: { id } });
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);
    return post;
  }

  // 제목 및 내용 검색 기능
  async searchPosts(keyword: string) {
    return this.prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: keyword } },
          { content: { contains: keyword } },
        ],
      },
    });
  }

  // Type으로 게시글 검색 기능
  async searchPostsByType(type: string) {
    return this.prisma.post.findMany({
      where: {
        type: type,
      },
    });
  }

  // 게시글 생성
  async createPost(
    createPostDto: CreatePostDto,
    userId: number,
    imageUrl: string | null,
  ) {
    return this.prisma.post.create({
      data: {
        ...createPostDto,
        authorId: userId,
        imageUrl,
      },
    });
  }

  // 게시글 수정
  async updatePost(
    id: number,
    updatePostDto: UpdatePostDto,
    imageUrl: string | null,
  ) {
    const post = await this.getPostById(id);
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);
    return this.prisma.post.update({
      where: { id },
      data: {
        ...updatePostDto,
        imageUrl: imageUrl || post.imageUrl,
      },
    });
  }

  // 게시글 삭제
  async deletePost(id: number) {
    const post = await this.getPostById(id);
    if (!post) throw new NotFoundException(`Post with ID ${id} not found`);
    return this.prisma.post.delete({ where: { id } });
  }
}
