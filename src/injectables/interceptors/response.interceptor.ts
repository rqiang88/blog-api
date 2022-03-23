import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(item => {
        const data = Reflect.has(item, 'data') ? item : { data: item };

        if (!Reflect.has(data, 'code')) {
          Object.assign(data, { code: 200 });
        }

        if (!Reflect.has(data, 'message')) {
          Object.assign(data, { message: 'success' });
        }

        return data;
      })
    );
  }
}
