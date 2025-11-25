import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtGuard } from '@/auth/guards/jwt/jwt.guard';
import { User } from '@/auth/decorators/jwtuser.decorator';
import { type JWTUser } from '@/auth/types/jwtUser';
import { User as PrismaUser } from 'generated/prisma';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('@me')
  @UseGuards(JwtGuard)
  getMe(@User() user: JWTUser): Promise<PrismaUser | null> {
    return this.usersService.findUserById(user.id);
  }
}
