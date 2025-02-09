import {
  All,
  Controller,
  Inject,
  Query,
  Logger,
  Body,
  Files,
} from '@midwayjs/decorator';

import { ReqParam } from '../../../../../../module/common/model/ReqParam';
import { Page } from '../../../../../../module/common/model/Page';
import { ILogger } from '@midwayjs/logger';
import { GoodsCategoryService } from '../../../../../../module/trade/goodsCategory.service';
import { GoodsCategory } from '../../../../../../entity/GoodsCategory';

import { Context } from '@midwayjs/koa';

import { JwtPassportMiddleware } from '../../../../../../middleware/jwt.passport.middleware';

/**
 * 员工用户中心商品分类控制器
 */
@Controller('/staff/web/userCenter/goods/goodsCategory', { middleware: [JwtPassportMiddleware,], }, )
export class StaffWebUserCenterGoodsGoodsCategoryController {
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
   * 注入商品分类服务
   */
  @Inject()
  private goodsCategoryService: GoodsCategoryService = null;
  /**
   * 获取商品分类分页列表
   * 
   * @param shopId - 店铺ID
   * @param query - 查询条件
   * @param params - 参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页结果
   */
  @All('/page.json', )
  public async page(
    @Query('shopId') shopId,
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
    console?.log?.(staffId);
    // 调用商品分类服务的分页方法
    const data = await this?.goodsCategoryService?.page?.(
      shopId,
      query,
      params,
      reqParam,
      page
    );
    // 返回分页结果
    return data;
  }
  /**
   * 根据ID获取商品分类信息
   * 
   * @param id - 商品分类ID
   * @returns 返回商品分类信息
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用商品分类服务的根据ID获取方法
    return await this?.goodsCategoryService?.getById?.(id);
  }
  /**
   * 删除商品分类
   * 
   * @param ids - 商品分类ID数组
   * @returns 返回删除结果
   */
  @All('/del.json', )
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用商品分类服务的删除方法
    await this?.goodsCategoryService?.del?.(ids);
  }
  /**
   * 更新商品分类信息
   * 
   * @param obj - 商品分类对象
   * @returns 返回更新结果
   */
  @All('/update.json', )
  public async update(@Body() obj: GoodsCategory): Promise<any> {
    // 调用商品分类服务的更新方法
    return await this?.goodsCategoryService?.update?.(obj);
  }
  /**
   * 上传商品分类图片
   * 
   * @param files - 上传的文件
   * @param query - 查询参数
   * @returns 返回上传结果
   */
  @All('/imgUpload.json')
  public async imgUpload(@Files() files, @Query() query): Promise<any> {
    // 调用商品分类服务的图片上传方法
    return await this?.goodsCategoryService?.imgUpload(files, query);
  }
  /**
   * 删除商品分类图片
   * 
   * @param id - 图片ID
   * @returns 返回删除结果
   */
  @All('/imgDel.json')
  public async imgDel(@Query('id') id): Promise<any> {
    // 调用商品分类服务的图片删除方法
    return await this?.goodsCategoryService?.imgDel(id);
  }
}
