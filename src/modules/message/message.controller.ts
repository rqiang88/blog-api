import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from '@/entities/message.entity';
import { CreateMessageDto as C } from './dto/create-message.dto';
import { UpdateMessageDto as U } from './dto/update-message.dto';
import { QueryMessageDto as Q } from './dto/query-message.dto';
import { IObject } from '@/interfaces/response.interface';
import { Paginate } from '@/decorators/paginate.decorator';
import { IQueryResult } from '@/interfaces/paginate.interface';

@Controller('admin/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(@Body() createMessageDto: C): Promise<Message> {
    return await this.messageService.create(createMessageDto);
  }

  @Get()
  async findAll(
    @Paginate() queryMessageDto: Q
  ): Promise<Partial<IQueryResult<Message>>> {
    return await this.messageService.findAll(queryMessageDto);
  }

  @Post('list')
  async findOne(@Param('id') id: string): Promise<Message> {
    return await this.messageService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMessageDto: U
  ): Promise<Message> {
    return await this.messageService.update(+id, updateMessageDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IObject> {
    return await this.messageService.remove(+id);
  }
}
