// 导入依赖项
import { Catch } from '@midwayjs/decorator';
import { httpError, MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

/**
 * 未找到错误过滤器类
 * 用于捕获并处理404错误
 */
@Catch(httpError.NotFoundError)
export class NotFoundFilter {
  /**
   * 捕获未找到错误
   * @param err - MidwayHttpError对象
   * @param ctx - Context对象
   * @returns 无返回值
   */
  public async catch(err: MidwayHttpError, ctx: Context) {
    // 404错误会到这里
    ctx.redirect('/404.html');
  }
}
