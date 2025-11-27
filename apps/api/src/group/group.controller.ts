import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { GroupService } from './group.service';
import { PrismaService } from '@/db/prisma.service';
import { JwtGuard } from '@/auth/guards/jwt/jwt.guard';
import { type JWTUser } from '@/auth/types/jwtUser';
import { User } from '@/auth/decorators/jwtuser.decorator';
import { CreateGroupRequest } from '@repo/shared/requests';

@Controller('group')
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post('create')
  @UseGuards(JwtGuard)
  async createGroup(@User() user: JWTUser, @Body() body: CreateGroupRequest) {
    const newGroup = await this.groupService.createGroup(user.id, body);

    return newGroup;
  }
}
