/**
 * 员工Web用户中心上传控制器
 * 处理文件上传请求
 */
export declare class StaffWebUserCenterUploadController {
    private logger;
    private app;
    /**
     * 处理文件上传请求
     * @param files - 上传的文件数组
     * @param query - 查询参数
     * @returns 返回上传文件的路径
     */
    upload(files: any, query: any): Promise<any>;
}
