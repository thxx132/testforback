// src/trust-score/trust-score.service.ts

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrustScoreService {
  constructor(private readonly prisma: PrismaService) {}

  async checkParticipation(fromUserProfileId: number, toUserProfileId: number) {
    const participations = await this.prisma.participation.findMany({
      where: {
        userProfileId: { in: [fromUserProfileId, toUserProfileId] },
      },
    });
    return participations.length >= 2;
  }

  async findExistingTrustScore(fromUserProfileId: number, toUserProfileId: number) {
    return this.prisma.trustScore.findFirst({
      where: {
        fromUserProfileId,
        toUserProfileId,
      },
    });
  }

  // 트러스트 점수 업데이트 (score를 활용해 toUserProfileId에 반영)
  async updateTrustScore(fromUserProfileId: number, toUserProfileId: number, score: number) {
    return this.prisma.$transaction(async (prisma) => {
      // TrustScore 테이블에 기록 추가
      await prisma.trustScore.create({
        data: {
          fromUserProfileId,
          toUserProfileId,
          score,
        },
      });

      // toUserProfileId의 trustScore에 score 값 반영
      await prisma.user.update({
        where: { id: toUserProfileId },
        data: {
          trustScore: { increment: score },
        },
      });
    });
  }
}
