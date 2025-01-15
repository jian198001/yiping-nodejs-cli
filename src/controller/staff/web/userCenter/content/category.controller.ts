import {
  All,
  Controller,
  Inject,
  Query,
  Logger,
  Body,
} from "@midwayjs/decorator";

import { ReqParam } from "../../../../../module/common/model/ReqParam";
import { Page } from "../../../../../module/common/model/Page";
import { ILogger } from "@midwayjs/logger";
import { CategoryService } from "../../../../../module/content/category.service";
import { Category } from "../../../../../entity/Category";

import { Context } from "@midwayjs/koa";
import { JwtPassportMiddleware } from "../../../../../middleware/jwt.passport.middleware";

/**
 * 员工Web用户中心内容分类控制器
 * 处理与分类相关的HTTP请求，如分页查询、根据ID查询、删除和更新
 */
@Controller("/staff/web/userCenter/content/category", {
  middleware: [JwtPassportMiddleware],
})
export class StaffWebUserCenterContentCategoryController {
  // 注入Context实例
  @Inject()
  private ctx: Context = null;
  // 注入Logger实例
  @Logger()
  private logger: ILogger = null;
  // 注入CategoryService实例
  @Inject()
  private categoryService: CategoryService = null;
  /**
   * 分页查询分类
   * @param query - 查询条件
   * @param params - 查询参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页查询结果
   */
  @All("/page.json")
  public async page(
    @Query("query") query: string,
    @Query("params") params: any,
    @Query() reqParam: ReqParam,
    @Query() page: Page
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.("分页列表controller");

    // 获取当前用户ID
    const staffId: string = this?.ctx?.state?.user?.id;

    console.log(staffId);

    // 调用categoryService的page方法进行分页查询
    const data = await this?.categoryService?.page?.(
      query,
      params,
      reqParam,
      page
    );

    return data;
  }

  /**
   * 根据ID查询分类
   * @param id - 分类ID
   * @returns 返回查询结果
   */
  @All("/getById.json")
  public async getById(@Query("id") id: string): Promise<any> {
    // 调用categoryService的getById方法根据ID查询分类
    return await this?.categoryService?.getById?.(id);
  }

  /**
   * 删除分类
   * @param ids - 分类ID数组
   * @returns 返回删除结果
   */
  @All("/del.json")
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用categoryService的del方法删除分类
    await this?.categoryService?.del?.(ids);
  }

  /**
   * 更新分类
   * @param obj - 分类对象
   * @returns 返回更新结果
   */
  @All("/update.json")
  public async update(@Body() obj: Category): Promise<any> {
    // 调用categoryService的update方法更新分类
    return await this?.categoryService?.update?.(obj);
  }
}
