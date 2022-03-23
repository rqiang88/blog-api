import { Common } from './common.dto';
import { PartialType } from '@nestjs/mapped-types';

export class CreateArticleDto extends PartialType(Common) {}
