import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';
import configuration from '@/modules/config/configuration';
import { getConnection } from 'typeorm';
import { QueryUserDto } from './dto/query-user.dto';
import { User } from '@/entities/User.entity';
import { UserModule } from '@/modules/user/User.module';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let user: User;

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
        UserModule
      ]
    }).compile();
    const app = moduleRef.createNestApplication();
    await app.init();
    service = moduleRef.get<UserService>(UserService);

    // generate default data
    user = await service.create({
      account: '13585780000',
      password: '123456'
    });
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll', async () => {
    const query = { limit: 20, page: 1 };
    const result = await service.findAll(query as QueryUserDto);
    expect.objectContaining(result);
  });

  it('findOne', async () => {
    expect(await service.findOne(user.id)).toBeInstanceOf(User);
  });

  it('create', async () => {
    const data = await service.create({
      account: '13585780001',
      password: '123456'
    });
    expect(data).toBeInstanceOf(User);
  });

  it('update', async () => {
    const data = { role: 'admin' };
    expect(await service.update(user.id, data)).toBeInstanceOf(User);
  });

  it('remove', async () => {
    const data = await service.remove(user.id);
    expect(data.message).toBe('success');
  });

  afterAll(async () => {
    await getConnection().query('delete from users');
  });
});
