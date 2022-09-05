import { QueryCategoryDto } from './dto/query-Category.dto';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('Controller', () => {
  let controller: CategoryController;
  const service = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryService,
          useValue: service
        }
      ]
    }).compile();

    controller = moduleRef.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('List Category', () => {
    it('should return an array if Categorys', async () => {
      const result = ['categories'];
      service.findAll.mockResolvedValue(result);
      expect(await controller.findAll({} as QueryCategoryDto)).toBe(result);
    });
  });

  describe('Category', () => {
    const result = {
      id: 1,
      name: 'title'
    };
    const id = result.id.toString();

    it('should return obj of Category ', async () => {
      service.create.mockResolvedValue(result);
      jest.spyOn(service, 'create').mockResolvedValue(result);
      expect(await controller.create({})).toBe(result);
    });

    it('should return obj Category', async () => {
      service.findOne.mockResolvedValue(result);
      expect(await controller.findOne(id)).toBe(result);
    });

    it('should return obj Category', async () => {
      service.update.mockResolvedValue(result);
      expect(await controller.update(id, {})).toBe(result);
    });
  });
});
