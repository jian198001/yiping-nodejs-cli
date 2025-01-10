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
import { PostService } from '../../../../../module/oa/post.service';
import { Post } from '../../../../../entity/Post';

import { JwtPassportMiddleware } from '../../../../../middleware/jwt.passport.middleware';
import { Context } from '@midwayjs/koa';

/**
 * 买家Web用户中心OA岗位控制器
 * 处理与岗位相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
@Controller('/buyer/web/userCenter/oa/post', { middleware: [JwtPassportMiddleware,], }, )
export class BuyerWebUserCenterDeptPostController {
  // 注入Context实例
  @Inject()
  private ctx: Context = null;
  
  // 注入Logger实例
  @Logger()
  private logger: ILogger = null;
  
  // 注入PostService实例
  @Inject()
  private postService: PostService = null;
  
  /**
   * 分页查询岗位
   * @param query - 查询条件
   * @param params - 查询参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页查询结果
   */
  @All('/page.json', )
  public async page(
    @Query('query') query: string,
    @Query() params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page,
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.('分页列表controller');
    
    // 获取当前用户ID
    const shopBuyerId: string = this?.ctx?.state?.user?.id;
    
    console.log(shopBuyerId);
    
    // 调用postService的page方法进行分页查询
    const data = await this?.postService?.page?.(query, params, reqParam, page);
    return data;
  }
  
  /**
   * 根据ID查询岗位
   * @param id - 岗位ID
   * @returns 返回查询结果
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用postService的getById方法根据ID查询岗位
    let data: any = await this?.postService?.getById?.(id);
    
    // 如果查询结果为空，则返回一个空对象
    if (!data) {
      data = {};
    }
    return data;
  }
  
  /**
   * 删除岗位
   * @param ids - 岗位ID数组
   * @returns 返回删除结果
   */
  @All('/del.json', )
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用postService的del方法删除岗位
    await this?.postService?.del?.(ids);
    return null;
  }
  
  /**
   * 更新岗位
   * @param obj - 岗位对象
   * @returns 返回更新结果
   */
  @All('/update.json', )
  public async update(@Body() obj: Post): Promise<any> {
    // 调用postService的update方法更新岗位
    return await this?.postService?.update?.(obj);
  }
}
