import { QueryUserDto } from './dto/query-User.dto';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('Controller', () => {
  let controller: UserController;
  const service = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: service
        }
      ]
    }).compile();

    controller = moduleRef.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('List User', () => {
    it('should return an array if Users', async () => {
      const result = ['categories'];
      service.findAll.mockResolvedValue(result);
      expect(await controller.findAll({} as QueryUserDto)).toBe(result);
    });
  });

  describe('User', () => {
    const result = {
      id: 1,
      name: 'title'
    };
    const id = result.id.toString();

    it('should return obj of User ', async () => {
      service.create.mockResolvedValue(result);
      jest.spyOn(service, 'create').mockResolvedValue(result);
      expect(await controller.create({ password: '123456' })).toBe(result);
    });

    it('should return obj User', async () => {
      service.findOne.mockResolvedValue(result);
      expect(await controller.findOne(id)).toBe(result);
    });

    it('should return obj User', async () => {
      service.update.mockResolvedValue(result);
      expect(await controller.update(id, {})).toBe(result);
    });
  });
});
