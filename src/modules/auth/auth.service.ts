import { check } from '@/utils/digest.util';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthDto } from './dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '@/entities/user.entity';
import { ValidateException } from '@/exceptions/validate.exception';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
    private readonly jwtService: JwtService
  ) {}

  async create(createAuthDto: CreateAuthDto): Promise<User> {
    const { account, password } = createAuthDto;
    const user = await this.repository.findOne({ account });
    if (user && check(password, user.password)) {
      const { id, account, role } = user;
      const token = this.jwtService.sign({
        id,
        account,
        role
      });
      return Object.assign(user, { token: token });
    } else {
      throw new ValidateException('用户名或者密码错误');
    }
  }
}
