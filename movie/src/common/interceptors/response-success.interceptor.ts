import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class ResponseSuccessInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res: Response = context.switchToHttp().getResponse();

    return next.handle().pipe(
      map((data) => {
        // Nếu data có message, đưa message ra ngoài
        if (data && typeof data === 'object' && 'message' in data) {
          const { message, ...restData } = data;
          return {
            status: 'success',
            statusCode: res.statusCode,
            message: message,
            data: restData,
          };
        }

        // Nếu không có message, giữ nguyên format cũ
        return {
          status: 'success',
          statusCode: res.statusCode,
          data: data,
        };
      }),
    );
  }
}
