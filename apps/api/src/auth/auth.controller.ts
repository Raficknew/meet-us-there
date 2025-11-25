import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleGuard } from './guards/google-auth/google-auth.guard';
import { User } from './decorators/jwtuser.decorator';
import { UsersService } from '@/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { GoogleAuthRequest } from './dto/google-auth.request.dto';
import { JWTUser } from './types/jwtUser';
import type { GoogleUserResponse, UserResponse } from '@repo/shared/responses';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('google/redirect')
  @UseGuards(GoogleGuard)
  async googleAuth() {}

  @Get('google/callback')
  @UseGuards(GoogleGuard)
  async googleAuthRedirect(
    @User() user: GoogleUserResponse,
    @Res() res: Response,
  ) {
    const FRONTEND_URL = process.env.FRONTEND_URL;
    const token = await this.authService.googleAuth(user);
    res.cookie('access_token', token, {
      httpOnly: false,
      secure: true,
      sameSite: 'none',
      maxAge: 60 * 60 * 1000,
    });

    return res.redirect(`${FRONTEND_URL}/login/callback`);
  }

  @Post('google')
  async google(@Body() body: GoogleAuthRequest): Promise<{
    user: UserResponse;
    access_token: string;
  }> {
    const userData = await this.authService.verifyGoogleToken(body.idToken);
    let user = await this.usersService.findUserByGoogleId(userData.id);

    if (!user) {
      user = await this.usersService.createUserWithGoogleData(userData);
    }

    const jwtUser: JWTUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      google_id: user.google_id,
    };

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar_link: user.avatar_link,
      },
      access_token: this.jwtService.sign({ user: jwtUser }),
    };
  }
}
