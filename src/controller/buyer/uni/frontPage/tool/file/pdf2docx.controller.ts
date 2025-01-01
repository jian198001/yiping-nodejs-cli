import {
  All,
  App,
  Controller,
  Files,
  Inject,
  Query,
} from '@midwayjs/decorator';
import { PdfService } from '../../../../../../module/file/pdf.service';
import { Application } from '@midwayjs/koa';
import * as fileUtils from '../../../../../../module/common/utils/fileUtils';
import path = require('path');

/**
 * 买家前端页面PDF转DOCX控制器
 */
@Controller('/buyer/uni/frontPage/pdf2docx')
export class BuyerUniFrontPagePdf2docxController {
  /**
   * 注入PDF服务
   */
  @Inject()
  private pdfService: PdfService = null;
  /**
   * 注入应用程序实例
   */
  @App()
  private app: Application = null;
  /**
   * 上传PDF文件并转换为DOCX
   * 
   * @param files - 上传的文件
   * @param query - 查询参数
   * @returns 返回转换后的DOCX文件路径
   */
  @All('/upload.json')
  public async upload(@Files() files, @Query() query): Promise<any> {
    // 复制上传的PDF文件到指定目录
    const filePath = fileUtils.copySync(
      files?.[0],
      'upload',
      this?.app.getAppDir()
    );
    // 获取上传文件的完整路径
    const p = path?.join?.(this?.app.getAppDir(), filePath);
    // 调用PDF服务的PDF转DOCX方法
    return await this?.pdfService.pdf2docx(p, this?.app.getAppDir());
  }
}  