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
import { ConsumeService } from '../../../../../module/inventory/consume.service';
import { Consume } from '../../../../../entity/Consume';

import { Context } from '@midwayjs/koa';
import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';

/**
 * 员工Web用户中心库存消费控制器
 * 处理与库存消费相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
@Controller('/staff/web/userCenter/inventory/consume', { middleware: [JwtPassportMiddleware,], }, )
export class StaffWebUserCenterInventoryConsumeController {
  // 注入Context实例
  @Inject()
  private ctx: Context = null;
  
  // 注入Logger实例
  @Logger()
  private logger: ILogger = null;
  
  // 注入ConsumeService实例
  @Inject()
  private consumeService: ConsumeService = null;
  
  /**
   * 分页查询库存消费记录
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
    // 记录日志
    this?.logger?.info?.('分页列表controller');
    
    // 获取当前用户ID
    const staffId: string = this?.ctx?.state?.user?.id;
    
    console?.log?.(staffId);
    
    // 调用consumeService的page方法进行分页查询
    const data = await this?.consumeService?.page?.(staffId, query, params, reqParam, page);

    return data;
  }
  
  /**
   * 根据ID查询库存消费记录
   * @param id - 库存消费记录ID
   * @returns 返回查询结果
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用consumeService的getById方法根据ID查询库存消费记录
    return await this?.consumeService?.getById?.(id);
  }
  
  /**
   * 删除库存消费记录
   * @param ids - 库存消费记录ID数组
   * @returns 返回删除结果
   */
  @All('/del.json', )
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用consumeService的del方法删除库存消费记录
    await this?.consumeService?.del?.(ids);
  }
  
  /**
   * 更新库存消费记录
   * @param obj - 库存消费记录对象
   * @returns 返回更新结果
   */
  @All('/update.json', )
  public async update(@Body() obj: Consume): Promise<any> {
    // 调用consumeService的update方法更新库存消费记录
    return await this?.consumeService?.update?.(obj);
  }
}
