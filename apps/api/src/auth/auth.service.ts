import { PrismaService } from '@/db/prisma.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GoogleUser } from './types/googleUser';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async googleAuth(user: GoogleUser) {
    let queryUser = await this.prismaService.user.findFirst({
      where: {
        google_id: user.id,
      },
    });

    if (!queryUser) {
      queryUser = await this.prismaService.user.create({
        data: {
          name: `${user.firstName}${user.lastName ? ` ${user.lastName}` : ''}`,
          email: user.email,
          avatar_link: user.picture,
          google_id: user.id,
        },
      });

      return this.jwtService.sign(
        {
          user: {
            id: queryUser.id,
            name: queryUser.name,
            email: queryUser.email,
            google_id: user.id,
          },
        },
        { secret: process.env.JWT_SECRET },
      );
    }
  }
}
