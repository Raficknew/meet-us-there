import { GoogleUser } from '@/auth/types/googleUser';
import { PrismaService } from '@/db/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from 'generated/prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findUserById(id: string): Promise<User | null> {
    return this.prismaService.user.findFirst({
      where: { id },
    });
  }

  async createUserWithGoogleData(data: GoogleUser): Promise<User> {
    const name = data.lastName
      ? data.firstName + ' ' + data.lastName
      : data.firstName;
    const user = await this.prismaService.user.create({
      data: {
        email: data.email,
        name,
        avatar_link: data.picture,
        google_id: data.id,
      },
    });

    return user;
  }

  async findUserByGoogleId(googleId: string): Promise<User | null> {
    return this.prismaService.user.findFirst({
      where: { google_id: googleId },
    });
  }
}
