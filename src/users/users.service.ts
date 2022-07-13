import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) { }

  public async getUserById(userId: number): Promise<User> {
    const entity = await this.userModel.findByPk(userId);
    return entity ? entity : null;
  }

  public async getUserByEmail(email: string): Promise<User> {
    return this.userModel.findOne({
      where: { email }
    });
  }
}
