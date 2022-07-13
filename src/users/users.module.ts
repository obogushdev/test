import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { SeederModule } from 'nestjs-sequelize-seeder';
import { SeedUser } from './seeds/users.seed';

@Module({
  imports: [
    SeederModule.forFeature([SeedUser]),
    SequelizeModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
