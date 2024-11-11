// src/user/user-profile.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserProfileService {
  constructor(private readonly prisma: PrismaService) {}

  // 사용자 프로필 생성, 특정 유저의 ID에 프로필을 추가
  async createUserProfile(userId: number, createProfileDto: CreateProfileDto) {
    return this.prisma.userProfile.create({
      data: {
        ...createProfileDto,
        userId,
      },
    });
  }

  // 프로필 ID로 특정 프로필 조회, 존재하지 않으면 예외 발생
  async getUserProfileById(profileId: number) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { id: profileId },
    });
    if (!profile)
      throw new NotFoundException(`Profile with ID ${profileId} not found`);
    return profile;
  }

  // 프로필 ID로 특정 프로필을 조회 후 업데이트, 존재하지 않으면 예외 발생
  async updateUserProfile(
    profileId: number,
    updateProfileDto: UpdateProfileDto,
  ) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { id: profileId },
    });
    if (!profile)
      throw new NotFoundException(`Profile with ID ${profileId} not found`);
    return this.prisma.userProfile.update({
      where: { id: profileId },
      data: updateProfileDto,
    });
  }

  // 프로필 ID로 특정 프로필을 조회하여 삭제, 존재하지 않으면 예외 발생
  async deleteUserProfile(profileId: number) {
    const profile = await this.prisma.userProfile.findUnique({
      where: { id: profileId },
    });
    if (!profile)
      throw new NotFoundException(`Profile with ID ${profileId} not found`);
    return this.prisma.userProfile.delete({ where: { id: profileId } });
  }
}
