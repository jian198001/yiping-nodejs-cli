import {
  All,
  Controller,
  Inject,
  Query,
  Logger,
  Body,
} from '@midwayjs/decorator';

import { ReqParam } from '../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../module/common/model/Page';
import { ILogger } from '@midwayjs/logger';
import { NoticeService } from '../../../../../module/notice/notice.service';
import { Notice } from '../../../../../entity/Notice';

import { Context } from '@midwayjs/koa';
import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

/**
 * 员工Web用户中心通知控制器
 * 处理与通知相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
@Controller('/staff/web/userCenter/notice/notice', { middleware: [JwtPassportMiddleware,], }, )
export class StaffWebUserCenterNoticeNoticeController {
  // 注入Context实例
  @Inject()
  private ctx: Context = null;
  
  // 注入Logger实例
  @Logger()
  private logger: ILogger = null;
  
  // 注入NoticeService实例
  @Inject()
  private noticeService: NoticeService = null;
  
  /**
   * 分页查询通知
   * @param query - 查询条件
   * @param params - 查询参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页查询结果
   */
  @All('/page.json', )
  public async page(
    @Query('query') query: string,
    @Query('params') params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page,
  ): Promise<any> {

    console?.log?.('page: ', page);    

    // 记录日志
    this?.logger?.info?.('分页列表controller');
    
    // 获取当前用户ID
    const staffId: string = this?.ctx?.state?.user?.id;
    
    console?.log?.(staffId);
    
    // 调用noticeService的page方法进行分页查询
    const data = await this?.noticeService?.page?.(query, params, reqParam, page);
    return data;
  }
  
  /**
   * 根据ID查询通知
   * @param id - 通知ID
   * @returns 返回查询结果
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用noticeService的getById方法根据ID查询通知
    return await this?.noticeService?.getById?.(id);
  }
  
  /**
   * 删除通知
   * @param ids - 通知ID数组
   * @returns 返回删除结果
   */
  @All('/del.json', )
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用noticeService的del方法删除通知
    await this?.noticeService?.del?.(ids);
  }
  
  /**
   * 更新通知
   * @param obj - 通知对象
   * @returns 返回更新结果
   */
  @All('/update.json', )
  public async update(@Body() obj: Notice): Promise<any> {

    // 调用noticeService的update方法更新通知
    return await this?.noticeService?.update?.(obj);
  }
}
