import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import configuration from '@/modules/config/configuration';
import { getConnection } from 'typeorm';
import { QueryMessageDto } from './dto/query-message.dto';
import { Message } from '@/entities/Message.entity';
import { MessageModule } from '@/modules/message/message.module';
import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;
  let message: Message;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: [`.env.${process.env.NODE_ENV}`],
          load: [configuration]
        }),
        TypeOrmModule.forRootAsync({
          useFactory: (configService: ConfigService) => configService.get('db'),
          inject: [ConfigService]
        }),
        MessageModule
      ]
    }).compile();
    const app = moduleRef.createNestApplication();
    await app.init();
    service = moduleRef.get<MessageService>(MessageService);

    // generate default data
    message = await service.create({
      account: 'hello',
      state: 'active',
      content: 'message-1'
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll', async () => {
    const query = { limit: 20, page: 1 };
    const result = await service.findAll(query as QueryMessageDto);
    expect.objectContaining(result);
  });

  it('findOne', async () => {
    expect(await service.findOne(message.id)).toBeInstanceOf(Message);
  });

  it('create', async () => {
    const data = await service.create({
      account: 'account-2',
      state: 'active',
      content: 'message-2'
    });
    expect(data).toBeInstanceOf(Message);
  });

  it('update', async () => {
    const data = { content: 'message-3' };
    expect(await service.update(message.id, data)).toBeInstanceOf(Message);
  });

  it('remove', async () => {
    const data = await service.remove(message.id);
    expect(data.message).toBe('success');
  });

  afterAll(async () => {
    await getConnection().query('delete from messages');
  });
});
