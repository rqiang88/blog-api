import { IQueryResult } from '@/interfaces/paginate.interface';
import { Message } from '@/entities/message.entity';
import { IObject } from '@/interfaces/response.interface';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMessageDto as C } from './dto/create-message.dto';
import { UpdateMessageDto as U } from './dto/update-message.dto';
import { QueryMessageDto as Q } from './dto/query-message.dto';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly repository: Repository<Message>
  ) {}

  async create(createMessageDto: C): Promise<Message> {
    const entity = await this.repository.create(createMessageDto);
    return await this.repository.save(entity);
  }

  async findAll(queryMessageDto: Q): Promise<Partial<IQueryResult<Message>>> {
    const { page, skip, take, limit, state } = queryMessageDto;
    let repository = this.repository.createQueryBuilder('message');
    if (!!state) {
      repository = repository.where('state = :state', { state });
    }
    const total = await repository.getCount();
    const data = await repository.take(take).skip(skip).getMany();
    const paginate = { total, page, limit };
    return { data, paginate };
  }

  async findOne(id: number): Promise<Message> {
    return await this.repository.findOneOrFail(id);
  }

  async update(id: number, updateMessageDto: U): Promise<Message> {
    await this.repository.update(id, updateMessageDto);
    return await this.repository.findOneOrFail(id);
  }

  async remove(id: number): Promise<IObject> {
    await this.repository.delete(id);
    return { message: 'success' };
  }
}
