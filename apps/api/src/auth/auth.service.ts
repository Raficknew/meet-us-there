import { PrismaService } from '@/db/prisma.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GoogleUser } from './types/googleUser';
import { UsersService } from '@/users/users.service';
import { GoogleUserResponse } from '@repo/shared/responses';
import { JWTUser } from './types/jwtUser';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  private client = new OAuth2Client(
    `${process.env.GOOGLE_ID}.apps.googleusercontent.com`,
  );

  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
    private userService: UsersService,
  ) {}

  async googleAuth(user: GoogleUserResponse) {
    let existingUser = await this.prismaService.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (!existingUser) {
      existingUser = await this.userService.createUserWithGoogleData({
        id: user.providerId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        picture: user.pictureUrl,
      });
    }

    const jwtUser: JWTUser = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
      google_id: existingUser.google_id,
    };

    return this.jwtService.sign({
      user: jwtUser,
    });
  }

  async verifyGoogleToken(idToken: string): Promise<GoogleUser> {
    const ticket = await this.client.verifyIdToken({
      idToken,
    });

    const payload = ticket.getPayload();

    return {
      id: payload!.sub,
      email: payload!.email!,
      firstName: payload!.given_name!,
      lastName: payload!.family_name!,
      picture: payload!.picture!,
    };
  }
}
