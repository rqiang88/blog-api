import { User } from '@/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      secretOrKey: process.env.LOGIN_SECRET
    });
  }

  async validate(payload: User): Promise<User> {
    return payload;
  }
}
