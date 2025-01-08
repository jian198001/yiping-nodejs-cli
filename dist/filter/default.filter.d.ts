import { Context } from '@midwayjs/koa';
/**
 * 默认错误过滤器类
 * 用于捕获并处理所有未分类的错误
 */
export declare class DefaultErrorFilter {
    /**
     * 捕获错误
     * @param err - 错误对象
     * @param ctx - 上下文对象
     * @returns 包含错误信息的对象
     */
    catch(err: Error, ctx: Context): Promise<{
        success: boolean;
        message: string;
    }>;
}
