import { Controller, Get, Response, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GoogleGuard } from './guards/google-auth/google-auth.guard';
import type { GoogleUser } from './types/googleUser';
import { User } from './decorators/jwtuser.decorator';

@Controller('google')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(GoogleGuard)
  @Get('redirect')
  async googleAuth() {}

  @UseGuards(GoogleGuard)
  @Get('callback')
  async googleAuthRedirect(@User() user: GoogleUser, @Response() response) {
    const token = await this.authService.googleAuth(user);
    response.redirect(`${process.env.FRONTEND_URL}?access_token=${token}`);
  }
  @UseGuards(GoogleGuard)
  @Get('login')
  async googleLogin(@User() user: GoogleUser, @Response() response) {
    const token = await this.authService.googleAuth(user);

    response.status(200);
    return response.json({
      access_token: token,
    });
  }
}
