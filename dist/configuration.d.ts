import * as koa from '@midwayjs/koa';
/**
 * 应用配置类
 * 导入各种MidwayJS组件和自定义中间件
 */
export declare class ContainerLifeCycle {
    app: koa.Application;
    /**
     * 应用启动时执行的钩子函数
     * 注册自定义中间件
     */
    onReady(): Promise<void>;
}
