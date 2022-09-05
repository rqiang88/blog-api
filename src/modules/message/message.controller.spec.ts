import { QueryMessageDto } from './dto/query-Message.dto';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('Controller', () => {
  let controller: MessageController;
  const service = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        {
          provide: MessageService,
          useValue: service
        }
      ]
    }).compile();

    controller = moduleRef.get<MessageController>(MessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('List Message', () => {
    it('should return an array if Messages', async () => {
      const result = ['categories'];
      service.findAll.mockResolvedValue(result);
      expect(await controller.findAll({} as QueryMessageDto)).toBe(result);
    });
  });

  describe('Message', () => {
    const result = {
      id: 1,
      name: 'title'
    };
    const id = result.id.toString();

    it('should return obj of Message ', async () => {
      service.create.mockResolvedValue(result);
      jest.spyOn(service, 'create').mockResolvedValue(result);
      expect(await controller.create({})).toBe(result);
    });

    it('should return obj Message', async () => {
      service.findOne.mockResolvedValue(result);
      expect(await controller.findOne(id)).toBe(result);
    });

    it('should return obj Message', async () => {
      service.update.mockResolvedValue(result);
      expect(await controller.update(id, {})).toBe(result);
    });
  });
});
