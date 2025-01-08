import { BaseService } from '../common/service/base.service';
export declare class PdfService extends BaseService {
    /**
     * 将PDF文件转换为图片
     * @param pdfFile - 要转换的PDF文件路径
     * @param outDir - 输出图片的目录
     * @returns 转换后的图片文件路径数组
     */
    private toImg;
    /**
     * 将PDF文件转换为图片并压缩成ZIP文件
     * @param pdfFile - 要转换的PDF文件路径
     * @param appDir - 应用程序的根目录
     * @returns 压缩后的ZIP文件路径
     */
    imgZip(pdfFile: string, appDir: string): Promise<string>;
    /**
     * 将PDF文件转换为Word文档
     * @param pdfFile - 要转换的PDF文件路径
     * @param appDir - 应用程序的根目录
     * @returns 转换后的Word文档路径
     */
    pdf2docx(pdfFile: string, appDir: string): Promise<string>;
}
