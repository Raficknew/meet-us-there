import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [AuthService, GoogleStrategy, JwtService],
  controllers: [AuthController],
  exports: [JwtService],
})
export class AuthModule {}
