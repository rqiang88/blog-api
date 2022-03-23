import { Common } from './common.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateArticleDto extends PartialType(Common) {}
