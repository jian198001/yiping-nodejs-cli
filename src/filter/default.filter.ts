// 导入依赖项
import { Catch } from '@midwayjs/decorator';
import { Context } from '@midwayjs/koa';

/**
 * 默认错误过滤器类
 * 用于捕获并处理所有未分类的错误
 */
@Catch()
export class DefaultErrorFilter {
  /**
   * 捕获错误
   * @param err - 错误对象
   * @param ctx - 上下文对象
   * @returns 包含错误信息的对象
   */
  public async catch(err: Error, ctx: Context) {
    // 所有未分类的错误会到这里
    return {
      success: false,
      message: err.message,
    };
  }
}
