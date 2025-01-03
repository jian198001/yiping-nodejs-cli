// 导入依赖项
import { Middleware, IMiddleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';
import { Result } from '../module/common/model/Result';

/**
 * 格式化中间件类
 * 用于统一处理API响应格式
 */
@Middleware()
export class FormatMiddleware implements IMiddleware<Context, NextFunction> {
  /**
   * 解析中间件
   * @returns 中间件函数
   */
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      // 创建一个Result对象，用于存储响应数据
      const result = new Result();

      let data: any = null;

      try {
        // 执行下一个中间件或路由处理函数
        data = await next();
      } catch (e) {
        // 如果发生错误，设置Result对象的错误码和错误信息
        result.code = e?.code;
        result.message = e?.message;

        // 返回Result对象
        return result;
      }

      // 设置Result对象的数据
      result.data = data;

      // 返回Result对象
      return result;
    };
  }

  /**
   * 匹配中间件
   * @param ctx - 上下文对象
   * @returns 如果路径包含/api/buyer或/api/staff，则返回true，否则返回false
   */
  match(ctx) {
    return (
      ctx.path.indexOf('/api/buyer') !== -1 || ctx.path.indexOf('/api/staff') !== -1
    );
  }
}
