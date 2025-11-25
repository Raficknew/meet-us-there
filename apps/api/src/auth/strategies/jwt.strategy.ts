import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTUser, Token } from '../types/jwtUser';
import { PrismaService } from '@/db/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prismaService: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: Token): Promise<JWTUser> {
    const user = await this.prismaService.user.findFirst({
      where: {
        google_id: payload.user.google_id,
      },
    });

    if (!user) throw new Error('User not found');

    return user;
  }
}
