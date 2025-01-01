import { Controller, Get, Inject, Logger } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger'; 
import { UserService } from '../../../../module/auth/user.service';
import { RoleService } from '../../../../module/auth/role.service';

/**
 * 员工Web前端页面初始化控制器
 * 处理与员工前端页面初始化相关的HTTP请求
 */
@Controller('/staff/web/frontPage/init')
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
  /**
   * 初始化员工前端页面
   * @returns 返回初始化数据，包括项目名称、是否开放注册和验证码等
   */
  @Get('/')
  public async init(): Promise<any> {
    // 记录日志
    this?.logger?.info?.('初始化controller');

    const conf: any = {
      // 项目中文名称
      projectNameCn: '一平管理系统',
      // 是否开放注册
      reg: false, 
      // 验证码
      captcha: null, 
    };
    // 调用userService的init方法初始化用户数据
    this.userService.init();
    // 调用roleService的init方法初始化角色数据
    this.roleService.init();

    const data = conf;

    return data;
  }
}
