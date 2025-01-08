/**
 * 网站首页控制器
 */
export declare class IndexController {
    /**
     * 网站正在建设中的HTML内容
     */
    private static html;
    /**
     * 处理/index.html路径的请求
     *
     * @returns 返回重定向到登录页面的HTML内容
     */
    index(): Promise<string>;
    /**
     * 处理根路径的请求
     *
     * @returns 返回网站正在建设中的HTML内容
     */
    root(): Promise<string>;
}
