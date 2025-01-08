/**
 * 员工Web前端页面初始化控制器
 * 处理与员工前端页面初始化相关的HTTP请求
 */
export declare class StaffWebFrontPageInitController {
    private logger;
    private userService;
    private roleService;
    /**
     * 初始化员工前端页面
     * @returns 返回初始化数据，包括项目名称、是否开放注册和验证码等
     */
    init(): Promise<any>;
}
