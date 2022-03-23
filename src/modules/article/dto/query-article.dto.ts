import { PartialType } from '@nestjs/mapped-types';
import { IPaginate } from '@/interfaces/paginate.interface';

export class QueryArticleDto extends PartialType(IPaginate) {
  readonly title: string;
  readonly categoryId: number;
}
