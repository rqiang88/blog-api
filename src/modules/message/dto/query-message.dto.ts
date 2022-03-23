import { IPaginate } from '@/interfaces/paginate.interface';
import { PartialType } from '@nestjs/mapped-types';
export class QueryMessageDto extends PartialType(IPaginate) {
  state: string;
  account: string;
}
