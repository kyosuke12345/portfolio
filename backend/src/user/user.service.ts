import { UserRole } from '@lib/lib/database/entities/dbType';
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hobby } from 'libs/lib/src/database/entities/hobby.entity';
import { User } from 'libs/lib/src/database/entities/user.entity';
import { Connection, In, Repository } from 'typeorm';
import { AddHobbyDTO, RemoveHobbyDTO } from './class/user.dto';
import { UserDetailResponse, UserListResponse } from './class/user.response';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Hobby) private hobbyRepository: Repository<Hobby>,
    private connection: Connection,
  ) { }

  async list(page: number, per: number) {
    const [list, total] = await this.userRepository.findAndCount({
      select: ['id', 'email', 'password', 'plainPassword'],
      where: {
        role: UserRole.Normal
      },
      order: {
        id: 'ASC',
      },
      skip: (page - 1) * per,
      take: per,
    });
    return new UserListResponse(list, page, per, total);
  }

  async detail(id: User['id']) {
    const user = await this.userRepository.findOne({
      relations: ['hobbies'],
      where: { id: id },
    });
    if (!user) {
      throw new NotFoundException();
    }

    return new UserDetailResponse(user);
  }

  async addHobies(user: User, dto: AddHobbyDTO) {
    if (user.id !== dto.userId) {
      throw new BadRequestException(
        `addHobies user id not equal loginUser: ${user.id} dto:${dto.userId}`,
      );
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const insData: Hobby[] = [];
      for (const hobby of dto.names) {
        const addHobby = new Hobby();
        addHobby.user = user;
        addHobby.name = hobby;
        insData.push(addHobby);
      }
      await queryRunner.manager.save(insData);
      await queryRunner.commitTransaction();
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        `add hobby error`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async removeHobbies(user: User, dto: RemoveHobbyDTO) {
    if (user.id !== dto.userId) {
      throw new BadRequestException(
        `addHobies user id not equal loginUser: ${user.id} dto:${dto.userId}`,
      );
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const removeHobbies = await this.hobbyRepository.find({
        where: { userId: user.id, id: In(dto.hobbyIds) },
      });
      if (removeHobbies.length > 0) {
        await queryRunner.manager.remove(removeHobbies);
        await queryRunner.commitTransaction();
      }
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new HttpException(
        `add hobby error`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async getByEmail(email: User['email']) {
    const user = await this.userRepository.findOne({ email: email });
    if (!user) {
      throw new UnauthorizedException('email user not found');
    }
    return user;
  }

  async getById(id: User['id']) {
    const user = await this.userRepository.findOne({ id: id });
    if (!user) {
      throw new UnauthorizedException('user id not found');
    }
    return user;
  }
}
