import { QueryArticleDto } from './dto/query-article.dto';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('ArticleController', () => {
  let controller: ArticleController;
  const service = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  };

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [
        {
          provide: ArticleService,
          useValue: service
        }
      ]
    }).compile();

    controller = moduleRef.get<ArticleController>(ArticleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('List Article', () => {
    it('should return an array if articles', async () => {
      const result = ['articles'];
      service.findAll.mockResolvedValue(result);
      expect(await controller.findAll({} as QueryArticleDto)).toBe(result);
    });
  });

  describe('Article', () => {
    const result = {
      id: 1,
      title: 'title',
      content: 'content'
    };
    const id = result.id.toString();

    it('should return obj of article ', async () => {
      service.create.mockResolvedValue(result);
      jest.spyOn(service, 'create').mockResolvedValue(result);
      expect(await controller.create({})).toBe(result);
    });

    it('should return obj article', async () => {
      service.findOne.mockResolvedValue(result);
      expect(await controller.findOne(id)).toBe(result);
    });

    it('should return obj article', async () => {
      service.update.mockResolvedValue(result);
      expect(await controller.update(id, {})).toBe(result);
    });
  });
});
