import { Controller, Get, Logger } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';  

/**
 * 买家Web前端页面初始化控制器
 * 处理与买家前端页面初始化相关的HTTP请求
 */
@Controller('/buyer/web/frontPage/init')
export class BuyerWebFrontPageInitController {
  // 注入Logger实例
  @Logger()
  private logger: ILogger = null;
  /**
   * 初始化买家前端页面
   * @returns 返回初始化数据，包括项目名称、是否开放注册和验证码等
   */
  @Get('/')
  public async init(): Promise<any> {
    // 记录日志
    this?.logger?.info?.('初始化controller');

    return {
      // 项目中文名称
      projectNameCn: '一平管理系统',
      // 是否开放注册
      reg: true,
      // 验证码
      captcha: null,
    };
  }
}
