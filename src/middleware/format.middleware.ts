import { Middleware, IMiddleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';
import { Result } from '../module/common/model/Result';

@Middleware()
export class FormatMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
 
      const result = new Result()

      let data: any = null;

      try {
        data = await next(); 
        
      } catch (e) {
 
        result.code = e?.code;

        result.message = e?.message;

        return result;
      }
 
      result.data = data;

      return result;
    };
  }

  match(ctx) {
    return (
      ctx.path.indexOf('/api/buyer') !== -1 || ctx.path.indexOf('/api/staff') !== -1
    );
  }
}
