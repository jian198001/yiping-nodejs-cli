import {
  App,
  All,
  Controller,
  Query,
  Logger,
  Files,
} from '@midwayjs/decorator';
import { Application } from '@midwayjs/koa';

import { ILogger } from '@midwayjs/logger';
import * as fileUtils from '../../../../../module/common/utils/fileUtils';

/**
 * 员工Web用户中心上传控制器
 * 处理文件上传请求
 */
@Controller('/staff/web/userCenter/upload', {
  tagName: '员工Web用户中心',
  description: '员工Web用户中心上传',
})
export class StaffWebUserCenterUploadController {
  // 注入Logger实例
  @Logger()
  private logger: ILogger = null;
  // 注入Application实例
  @App()
  private app: Application = null;
  /**
   * 处理文件上传请求
   * @param files - 上传的文件数组
   * @param query - 查询参数
   * @returns 返回上传文件的路径
   */
  @All('/upload.json')
  public async upload(@Files() files, @Query() query): Promise<any> {
    // 记录日志
    this?.logger?.info?.('文件上传');

    // 打印上传的文件信息
    console.log(files);

    // 复制上传的文件到指定目录，并返回文件路径
    const data =
      '/' + fileUtils?.copySync(files?.[0], 'upload', this?.app?.getAppDir());

    return data;
  }
}
