import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './db/prisma.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { GroupModule } from './group/group.module';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
    AuthModule,
    PrismaModule,
    UsersModule,
    GroupModule,
  ],
})
export class AppModule {}
