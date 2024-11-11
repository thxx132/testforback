// src/user/user.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // 새로운 사용자를 생성하며, 비밀번호를 bcrypt로 암호화하여 저장
  async createUser(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  // ID로 사용자를 조회하며, 존재하지 않을 경우 예외를 발생
  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  // ID로 사용자를 조회하여 정보 업데이트, 사용자 존재 여부를 확인 후 진행
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  // ID로 사용자를 조회하여 삭제하며, 존재하지 않을 경우 예외를 발생
  async deleteUser(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return this.prisma.user.delete({ where: { id } });
  }
}
