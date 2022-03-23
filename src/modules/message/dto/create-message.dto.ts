import { Common } from './common.dto';
import { PartialType } from '@nestjs/mapped-types';

export class CreateMessageDto extends PartialType(Common) {}
