import { PrismaService } from '@/db/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateGroupRequest } from '@repo/shared/requests';

@Injectable()
export class GroupService {
  constructor(private readonly prismaService: PrismaService) {}

  async createGroup(userId, data: CreateGroupRequest) {
    console.log('Creating group with data', userId, data);
  }
}
