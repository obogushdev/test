import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from "./strategies/jwtStrategy";

@Module({
    imports: [UsersModule, PassportModule, JwtModule.register({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '60s' },
      })],
    controllers: [AuthController],
    providers: [AuthService,  JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {}
