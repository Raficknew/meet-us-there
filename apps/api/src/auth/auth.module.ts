import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist/jwt.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  providers: [AuthService, GoogleStrategy, JwtService],
  controllers: [AuthController],
  exports: [JwtService],
})
export class AuthModule {}
