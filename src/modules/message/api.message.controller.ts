import { Controller, Post, Body } from '@nestjs/common';
import { MessageService } from './message.service';
import { Message } from '@/entities/message.entity';
import { CreateMessageDto as C } from './dto/create-message.dto';

@Controller('api/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async create(@Body() createMessageDto: C): Promise<Message> {
    return await this.messageService.create(createMessageDto);
  }
}
