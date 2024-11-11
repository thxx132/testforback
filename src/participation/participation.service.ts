// src/participation/participation.service.ts

import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateParticipationDto } from './dto/create-participation.dto';
import { CancelParticipationDto } from './dto/cancel-participation.dto';
import { ParticipationCounterService } from './participation-counter.service';

@Injectable()
export class ParticipationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly participationCounterService: ParticipationCounterService,
  ) {}

  // 참여 기능 (트랜잭션 적용 및 중복 참여 방지)
  async participate(
    createParticipationDto: CreateParticipationDto,
    userProfileId: number,
  ) {
    const { postId, quantity } = createParticipationDto;

    // 중복 참여 방지
    const existingParticipation = await this.prisma.participation.findUnique({
      where: {
        postId_userProfileId: { postId, userProfileId },
      },
    });
    if (existingParticipation) {
      throw new BadRequestException(
        `You have already participated in post ${postId}`,
      );
    }

    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post)
      throw new BadRequestException(`Post with ID ${postId} not found`);

    if (quantity % post.unitQuantity !== 0) {
      throw new BadRequestException(
        `Quantity must be a multiple of ${post.unitQuantity}`,
      );
    }

    // 트랜잭션을 사용하여 참여 기록 생성 및 카운터 업데이트를 원자적으로 처리
    await this.prisma.$transaction(async (prisma) => {
      await prisma.participation.create({
        data: {
          postId,
          userProfileId,
          quantity,
        },
      });

      await this.participationCounterService.incrementCounter(
        postId,
        quantity,
        prisma,
      );
    });
  }

  // 참여 취소 기능 (트랜잭션 적용 및 중복 취소 방지)
  async cancelParticipation(
    cancelParticipationDto: CancelParticipationDto,
    userProfileId: number,
  ) {
    const { postId } = cancelParticipationDto;

    const participation = await this.prisma.participation.findUnique({
      where: {
        postId_userProfileId: { postId, userProfileId },
      },
    });
    if (!participation)
      throw new BadRequestException(
        `No participation found for post ${postId} to cancel`,
      );

    await this.prisma.$transaction(async (prisma) => {
      await prisma.participation.delete({
        where: {
          postId_userProfileId: { postId, userProfileId },
        },
      });

      await this.participationCounterService.decrementCounter(
        postId,
        participation.quantity,
        prisma,
      );
    });
  }
}
