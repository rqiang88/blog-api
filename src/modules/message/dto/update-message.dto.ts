import { PartialType } from '@nestjs/mapped-types';
import { Common } from './common.dto';

export class UpdateMessageDto extends PartialType(Common) {}
