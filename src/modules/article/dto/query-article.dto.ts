import { PartialType } from '@nestjs/mapped-types';
import { IPaginate } from '@/interfaces/paginate.interface';
import { ApiProperty } from '@nestjs/swagger';

export class QueryArticleDto extends PartialType(IPaginate) {
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly categoryId: number;
}
