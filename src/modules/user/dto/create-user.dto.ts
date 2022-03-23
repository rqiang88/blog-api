import { PartialType } from '@nestjs/mapped-types';
import { Common } from './common.dto';

export class CreateUserDto extends PartialType(Common) {
  password: string;
}
