import { PrismaService } from '@/db/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateGroupRequest } from '@repo/shared/requests';

@Injectable()
export class GroupService {
  constructor(private readonly prismaService: PrismaService) {}

  async createGroup(userId: string, data: CreateGroupRequest) {
    const newGroup = await this.prismaService.group.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });

    return this.prismaService.member.create({
      data: {
        user_id: userId,
        group_id: newGroup.id,
        role: 'OWNER',
      },
    });
  }
}
