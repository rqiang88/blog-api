import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto as C } from './dto/create-user.dto';
import { UpdateUserDto as U } from './dto/update-user.dto';
import { QueryUserDto as Q } from './dto/query-user.dto';
import { User } from '@/entities/user.entity';
import { IQueryResult } from '@/interfaces/paginate.interface';
import { IObject } from '@/interfaces/response.interface';
import { RoleGuard } from '@/injectables/guards/role.guard';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(RoleGuard)
@UseGuards(AuthGuard('jwt'))
@Controller('admin/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: C): Promise<User> {
    return await this.userService.create(createUserDto);
  }

  @Post('list')
  async findAll(queryUserDto: Q): Promise<Partial<IQueryResult<User>>> {
    return await this.userService.findAll(queryUserDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: U
  ): Promise<User> {
    return await this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IObject> {
    return await this.userService.remove(+id);
  }
}
