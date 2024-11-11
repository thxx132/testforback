// src/user/user-profile.controller.ts

import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('users/:userId/profiles')
@UseGuards(JwtAuthGuard) // 모든 엔드포인트에 인증 적용
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  // 프로필 생성
  @Post()
  async createUserProfile(
    @Param('userId') userId: number,
    @Body() createProfileDto: CreateProfileDto,
    @Request() req,
  ) {
    this.verifyUserOwnership(userId, req.user.userId);
    return this.userProfileService.createUserProfile(userId, createProfileDto);
  }

  // 특정 프로필 조회
  @Get(':profileId')
  async getUserProfile(
    @Param('userId') userId: number,
    @Param('profileId') profileId: number,
    @Request() req,
  ) {
    this.verifyUserOwnership(userId, req.user.userId);
    return this.userProfileService.getUserProfileById(profileId);
  }

  // 프로필 업데이트
  @Patch(':profileId')
  async updateUserProfile(
    @Param('userId') userId: number,
    @Param('profileId') profileId: number,
    @Body() updateProfileDto: UpdateProfileDto,
    @Request() req,
  ) {
    this.verifyUserOwnership(userId, req.user.userId);
    return this.userProfileService.updateUserProfile(
      profileId,
      updateProfileDto,
    );
  }

  // 프로필 삭제
  @Delete(':profileId')
  async deleteUserProfile(
    @Param('userId') userId: number,
    @Param('profileId') profileId: number,
    @Request() req,
  ) {
    this.verifyUserOwnership(userId, req.user.userId);
    return this.userProfileService.deleteUserProfile(profileId);
  }

  // 사용자 소유권 검증
  private verifyUserOwnership(userId: number, currentUserId: number) {
    if (userId !== currentUserId) {
      throw new ForbiddenException('You do not have access to this profile');
    }
  }
}
