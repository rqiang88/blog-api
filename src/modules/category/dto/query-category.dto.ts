import { PartialType } from '@nestjs/mapped-types';
import { IPaginate } from '@/interfaces/paginate.interface';

export class QueryCategoryDto extends PartialType(IPaginate) {
  readonly name: string;
}
