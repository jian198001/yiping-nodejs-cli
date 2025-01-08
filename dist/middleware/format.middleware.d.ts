import { IMiddleware } from '@midwayjs/core';
import { NextFunction, Context } from '@midwayjs/koa';
import { Result } from '../module/common/model/Result';
/**
 * 格式化中间件类
 * 用于统一处理API响应格式
 */
export declare class FormatMiddleware implements IMiddleware<Context, NextFunction> {
    /**
     * 解析中间件
     * @returns 中间件函数
     */
    resolve(): (ctx: Context, next: NextFunction) => Promise<Result>;
    /**
     * 匹配中间件
     * @param ctx - 上下文对象
     * @returns 如果路径包含/api/buyer或/api/staff，则返回true，否则返回false
     */
    match(ctx: any): boolean;
}
