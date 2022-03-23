import { IPaginate } from '@/interfaces/paginate.interface';
import { PartialType } from '@nestjs/mapped-types';

export class QueryUserDto extends PartialType(IPaginate) {
  state: string;
  account: string;
}
