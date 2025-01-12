import {
  All,
  Controller,
  Inject,
  Query,
  Logger,
  Body,
} from '@midwayjs/decorator';

import { ReqParam } from '../../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../../module/common/model/Page';
import { ILogger } from '@midwayjs/logger';
import { GiftCardService } from '../../../../../../module/trade/giftCard.service';
import { GiftCard } from '../../../../../../entity/GiftCard';

import { Context } from '@midwayjs/koa';

import { JwtPassportMiddleware } from '../../../../../../middleware/jwt.passport.middleware';

/**
 * 员工用户中心礼品卡控制器
 */
@Controller('/staff/web/userCenter/card/giftCard', { middleware: [JwtPassportMiddleware,], }, )
export class StaffWebUserCenterCardGiftCardController {
  /**
   * 注入上下文对象
   */
  @Inject()
  private ctx: Context = null;
  /**
   * 注入日志记录器
   */
  @Logger()
  private logger: ILogger = null;
  /**
   * 注入礼品卡服务
   */
  @Inject()
  private giftCardService: GiftCardService = null;
  /**
   * 获取礼品卡分页列表
   * 
   * @param query - 查询条件
   * @param params - 参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页结果
   */
  @All('/page.json', )
  public async page(
    @Query('query') query: string,
    @Query('params') params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page,
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.('分页列表controller');
    // 获取当前用户的ID
    const staffId: string = this?.ctx?.state?.user?.id;
    // 打印当前用户的ID
    console.log(staffId);
    // 调用礼品卡服务的分页方法
    const data = await this?.giftCardService?.page?.(query, params, reqParam, page);
    // 返回分页结果
    return data;
  }
  /**
   * 根据ID获取礼品卡信息
   * 
   * @param id - 礼品卡ID
   * @returns 返回礼品卡信息
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用礼品卡服务的根据ID获取方法
    return await this?.giftCardService?.getById?.(id);
  }
  /**
   * 删除礼品卡
   * 
   * @param ids - 礼品卡ID数组
   * @returns 返回删除结果
   */
  @All('/del.json', )
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用礼品卡服务的删除方法
    await this?.giftCardService?.del?.(ids);
    // 返回空值
     return {} ;
  }
  /**
   * 更新礼品卡信息
   * 
   * @param obj - 礼品卡对象
   * @returns 返回更新结果
   */
  @All('/update.json', )
  public async update(@Body() obj: GiftCard): Promise<any> {
    // 调用礼品卡服务的更新方法
    return await this?.giftCardService?.update?.(obj);
  }
}
