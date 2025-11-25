/* eslint-disable @typescript-eslint/no-unsafe-call */
import { PrismaService } from '@/db/prisma.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import {
  Strategy,
  StrategyOptions,
  type VerifyCallback,
} from 'passport-google-oauth20';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private prismaService: PrismaService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.CALLBACK_URL,
      scope: ['email', 'profile'],
      passReqToCallback: false,
    } as StrategyOptions);
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ) {
    const { id, name, emails, photos } = profile;

    const user = await this.prismaService.user.findFirst({
      where: { google_id: id },
    });

    if (user) {
      const existingUser = {
        provider: 'google',
        providerId: id,
        email: user.email,
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ')[1] || '',
        pictureUrl: photos[0].value,
      };
      return done(null, existingUser);
    }

    const newUser = {
      provider: 'google',
      providerId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      pictureUrl: photos[0].value,
    };
    return done(null, newUser);
  }
}
