/**
 * 买家前端页面PDF转DOCX控制器
 */
export declare class BuyerUniFrontPagePdf2docxController {
    /**
     * 注入PDF服务
     */
    private pdfService;
    /**
     * 注入应用程序实例
     */
    private app;
    /**
     * 上传PDF文件并转换为DOCX
     *
     * @param files - 上传的文件
     * @param query - 查询参数
     * @returns 返回转换后的DOCX文件路径
     */
    upload(files: any, query: any): Promise<any>;
}
