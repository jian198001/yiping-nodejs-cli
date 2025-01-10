import { All, Controller, Query, Inject, Logger } from '@midwayjs/decorator';

import { ReqParam } from '../../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../../module/common/model/Page';
import { ILogger } from '@midwayjs/logger';

import { ShopBuyerService } from '../../../../../../module/trade/shopBuyer.service';

import { Context } from '@midwayjs/koa';
import { JwtPassportMiddleware } from '../../../../../../middleware/jwt.passport.middleware';

/**
 * 员工用户中心买家控制器
 */
@Controller('/staff/web/userCenter/trade/buyer/buyer', { middleware: [JwtPassportMiddleware,], }, )
export class StaffWebUserCenterTradeOrderBuyerBuyerController {
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
   * 注入店铺买家服务
   */
  @Inject()
  private shopBuyerService: ShopBuyerService = null;
  
  /**
   * 获取当前用户的父关联用户
   * 
   * @param id - 用户ID
   * @returns 返回父关联用户信息
   */
  @All('/getParent.json', )
  public async getParent(@Query('id') id: string): Promise<any> {
    // 记录日志
    this?.logger?.info?.('取得当前用户的父关联用户');
    
    // 获取当前用户的ID
    const staffId: string = this?.ctx?.state?.user?.id;
    
    // 打印当前用户的ID
    console.log(staffId);
    
    // 调用店铺买家服务的获取父关联用户方法
    return await this?.shopBuyerService?.getParent?.(id);
  }
  
  /**
   * 获取当前用户的子一级关联用户
   * 
   * @param id - 用户ID
   * @returns 返回子一级关联用户信息
   */
  @All('/getChildren.json')
  public async getChildren(@Query('id') id: string): Promise<any> {
    // 记录日志
    this?.logger?.info?.('取得当前用户的子一级关联用户');
    
    // 调用店铺买家服务的获取子一级关联用户方法
    return await this?.shopBuyerService?.getChildren(id);
  }
  
  /**
   * 获取买家分页列表
   * 
   * @param parentShopBuyerId - 父店铺买家ID
   * @param query - 查询条件
   * @param params - 参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页结果
   */
  @All('/page.json', )
  public async page(
    @Query('parentShopBuyerId') parentShopBuyerId: string = '',
    @Query('query') query: string,
    @Query('params') params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page,
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.('分页列表controller');
    
    // 调用店铺买家服务的分页方法
    const data = await this?.shopBuyerService?.page?.(
      parentShopBuyerId,
      query,
      params,
      reqParam,
      page
    );
    
    // 返回分页结果
    return data;
  }
  
  /**
   * 根据ID获取买家信息
   * 
   * @param id - 买家ID
   * @returns 返回买家信息
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用店铺买家服务的根据ID获取方法
    return await this?.shopBuyerService?.getById?.(id);
  }
}
