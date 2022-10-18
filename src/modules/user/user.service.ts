import { User } from '@/entities/user.entity';
import { IObject } from '@/interfaces/response.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto as C } from './dto/create-user.dto';
import { UpdateUserDto as U } from './dto/update-user.dto';
import { QueryUserDto as Q } from './dto/query-user.dto';
import { IQueryResult } from '@/interfaces/paginate.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  async create(createUserDto: C): Promise<User> {
    const entity = await this.repository.create(createUserDto);
    return await this.repository.save(entity);
  }

  async findAll(queryUserDto: Q): Promise<Partial<IQueryResult<User>>> {
    const { page, skip, take, limit, state } = queryUserDto;
    const repository = this.repository.createQueryBuilder('user');
    if (!!state) {
      repository.where('state = :state', { state });
    }
    const total = await repository.getCount();
    const data = await repository
      .take(take)
      .skip(skip)
      .orderBy('id', 'DESC')
      .getMany();
    const paginate = { total, page, limit };
    return { data, paginate };
  }

  async findOne(id: number): Promise<User> {
    return await this.repository.findOneOrFail(id);
  }

  async update(id: number, updateUserDto: U): Promise<User> {
    await this.repository.update(id, updateUserDto);
    return await this.repository.findOneOrFail(id);
  }

  async remove(id: number): Promise<IObject> {
    await this.repository.delete(id);
    return { message: 'success' };
  }
}
