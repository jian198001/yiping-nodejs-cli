// 导入MidwayJS的装饰器和服务
import { Controller, Get, Inject, Logger } from "@midwayjs/decorator";
// 导入MidwayJS的日志接口
import { ILogger } from "@midwayjs/logger";
// 导入用户服务
import { UserService } from "../../../../module/auth/user.service";
// 导入角色服务
import { RoleService } from "../../../../module/auth/role.service";
// 导入分页模型
import { Page } from "../../../../module/common/model/Page";
// 导入部门服务
import { DeptService } from "../../../../module/oa/dept.service";
// 导入岗位服务
import { PostService } from "../../../../module/oa/post.service";
// 导入文章栏目服务
import { CategoryService } from "../../../../module/content/category.service";
// 导入商品分类服务
import { GoodsCategoryService } from "../../../../module/trade/goodsCategory.service";

/**
 * 员工Web前端页面初始化控制器
 * 处理与员工前端页面初始化相关的HTTP请求
 */
@Controller("/staff/web/frontPage/init")
export class StaffWebFrontPageInitController {
  // 注入Logger实例
  @Logger()
  private logger: ILogger = null;
  // 注入UserService实例
  @Inject()
  private userService: UserService = null;
  // 注入RoleService实例
  @Inject()
  private roleService: RoleService = null;
  // 注入DeptService实例
  @Inject()
  private deptService: DeptService = null;
  // 注入PostService实例
  @Inject()
  private postService: PostService = null;
  // 注入CategoryService实例，用于处理文章栏目相关业务逻辑
  @Inject()
  private categoryService: CategoryService = null;
  // 注入GoodsCategoryService实例，用于处理商品分类相关业务逻辑
  @Inject()
  private goodsCategoryService: GoodsCategoryService = null;
  /**
   * 初始化员工前端页面
   * @returns 返回初始化数据，包括项目名称、是否开放注册和验证码等
   */
  @Get("/")
  public async init(): Promise<any> {
    // 记录日志
    this?.logger?.info?.("初始化controller");

    const conf: any = {
      // 项目中文名称
      projectNameCn: "一平管理系统",
      // 是否开放注册
      reg: false,
      // 验证码
      captcha: null,
    };
    // 调用userService的init方法初始化用户数据
    this?.userService?.init?.();
    // 调用roleService的init方法初始化角色数据
    this?.roleService?.init?.();

    // TODO: 将多个数据项从数据库中读取,放入redis中

    // 角色/部门/岗位/物料分类/文章栏目/商品分类
    // 创建一个新的Page对象，用于分页查询
    const page = new Page();
    // 设置每页显示的记录数为0，表示查询所有记录
    page.pageSize = 0;

    // 调用roleService的page方法，查询所有角色数据
    this?.roleService?.page?.(null, null, null, null, null, page);

    // 调用deptService的page方法，查询所有部门数据
    this?.deptService?.page?.(null, null, null, page);

    // 调用postService的page方法，查询所有岗位数据
    this?.postService?.page?.(null, null, null, page);

    // 调用categoryService的page方法，查询所有文章栏目数据
    this?.categoryService?.page?.(null, null, null, page);

    // 调用goodsCategoryService的page方法，查询所有商品分类数据
    this?.goodsCategoryService?.page?.(null, null, null, null, page);

    // 将配置对象赋值给data变量
    const data = conf;

    // 返回data对象，包含项目名称、是否开放注册和验证码等信息
    return data;
  }
}
