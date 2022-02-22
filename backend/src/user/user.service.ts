import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { AddHobbyDTO } from './class/user.dto';
import { UserDetailResponse, UserListResponse } from './class/user.response';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  async list(page: number, per: number) {
    const [list, total] = await this.userRepository.findAndCount({
      select: ['id', 'email', 'password', 'plainPassword'],
      order: {
        id: 'ASC'
      },
      skip: page - 1,
      take: per,
    });
    return new UserListResponse(list, page, per, total);
  }

  async detail(id: number) {
    const user = await this.userRepository.findOne({
      relations: ['hobbies'],
      where: {
        id: id
      }
    });

    if (!user) {
      throw new NotFoundException();
    }
    return new UserDetailResponse(user);
  }

  async addHobies(user: User, dto: AddHobbyDTO) {
    return {};
  }
}
