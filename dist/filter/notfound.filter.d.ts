import { MidwayHttpError } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
/**
 * 未找到错误过滤器类
 * 用于捕获并处理404错误
 */
export declare class NotFoundFilter {
    /**
     * 捕获未找到错误
     * @param err - MidwayHttpError对象
     * @param ctx - Context对象
     * @returns 无返回值
     */
    catch(err: MidwayHttpError, ctx: Context): Promise<void>;
}
