import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserProfileService } from './user-profile.service';
import { UserController } from './user.controller';
import { UserProfileController } from './user-profile.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UserController, UserProfileController],
  providers: [UserService, UserProfileService],
  exports: [UserService, UserProfileService],
})
export class UserModule {}
