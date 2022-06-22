import { ApiProperty } from '@nestjs/swagger';
export class Common {
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly content: string;
  @ApiProperty()
  readonly state: string;
  @ApiProperty()
  readonly categoryId: number;
}
