import {
  All, Body, Controller, Inject,
  Logger,
  Query,
} from "@midwayjs/decorator";

import { JwtPassportMiddleware } from "../../../../../middleware/jwt.passport.middleware";
import { Context } from "@midwayjs/koa";
import { ILogger } from "@midwayjs/logger";
import { ReqParam } from "../../../../../module/common/model/ReqParam";
import { Page } from "../../../../../module/common/model/Page";
import { UserService } from "../../../../../module/auth/user.service";

import { User } from "../../../../../module/common/model/User";

/**
 * 用户Web用户中心认证用户控制器
 * 处理与用户相关的HTTP请求，如分页查询、根据ID查询、删除、更新、更新密码、重置密码、根据Token获取用户信息、获取用户详情、获取用户设置和获取用户中心信息
 */
@Controller("/staff/web/userCenter/auth/user", { middleware: [JwtPassportMiddleware,], }, )
export class UserWebUserCenterAuthUserController {

  // 注入Context实例
  @Inject()
  private ctx: Context = null;

  // 注入Logger实例
  @Logger()
  private logger: ILogger = null

  // 注入UserService实例
  @Inject()
  private userService: UserService = null;

  /**
   * 分页查询用户
   * @param query - 查询条件
   * @param params - 查询参数
   * @param reqParam - 请求参数
   * @param page - 分页信息
   * @returns 返回分页查询结果
   */
  @All('/page.json', )
  public async page(
    @Query('query') query: string,
    @Query('params') params: any, @Query() reqParam: ReqParam,
    @Query() page: Page,
  ): Promise<any> {
    // 记录日志
    this?.logger?.info?.('分页列表controller');

    // 获取当前用户ID
    const staffId: string = this?.ctx?.state?.user?.id;

    console?.log?.(staffId);

    // 调用userService的page方法进行分页查询
    const data = await this?.userService?.page?.(query, params, reqParam, page);

    return data

  }

  /**
   * 根据ID查询用户
   * @param id - 用户ID
   * @returns 返回查询结果
   */
  @All('/getById.json', )
  public async getById(@Query('id') id: string): Promise<any> {
    // 调用userService的getById方法根据ID查询用户
    return await this?.userService?.getById?.(id);

  }

  /**
   * 删除用户
   * @param ids - 用户ID数组
   * @returns 返回删除结果
   */
  @All('/del.json', )
  public async del(@Body() ids: string[]): Promise<any> {
    // 调用userService的del方法删除用户
    await this?.userService?.del?.(ids);

  }

  /**
   * 更新用户
   * @param obj - 用户对象
   * @param roleIds - 角色ID数组
   * @returns 返回更新结果
   */
  @All('/update.json', )
  public async update(@Body() obj: User, @Body('roleIds') roleIds): Promise<any> {
    // 调用userService的update方法更新用户
    return await this?.userService?.update?.(obj, roleIds);

  }

  /**
   * 更新用户密码
   * @param obj - 包含新密码的对象
   * @returns 返回更新结果
   */
  @All('/updatePwd.json', )
  public async updatePwd(@Body() obj: any): Promise<any> {
    // 获取当前用户ID
    const staffId: string = this?.ctx?.state?.user?.id;

    // 设置用户ID
    obj.id = staffId

    // 调用userService的updatePwd方法更新用户密码
    return await this?.userService?.updatePwd?.(obj,);

  }

  /**
   * 重置用户密码
   * @param id - 用户ID
   * @returns 返回重置结果
   */
  @All('/resetPwd.json', )
  public async resetPwd(@Query('id') id: string): Promise<any> {
    // 调用userService的resetPwd方法重置用户密码
    return await this?.userService?.resetPwd?.(id,);

  }

  /**
   * 根据Token获取用户信息
   * @returns 返回用户信息
   */
  @All("/getByToken.json", )
  public async getByToken(): Promise<any> {
    // 获取当前用户ID
    const staffId: string = this?.ctx?.state?.user?.id;

    // 调用userService的getById方法根据ID查询用户
    let data = await this?.userService?.getById?.(staffId);

    // 格式化用户信息
    data = {
      ...data,

      name: data?.username,
      avatar:
        "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
    }

    return data

  }

  /**
   * 获取用户详情
   * @returns 返回用户详情
   */
  @All("/detail.json", )
  public async detail(): Promise<any> {
    // 返回用户详情
    return {
      name: "jack hao",
      avatar:
        "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
      userid: "00000001",
      email: "antdesign@alipay.com",
      signature: "签名文字",
      title: "交互专家",
      group: "某某技术部－UED",
      tags: [
        {
          key: "0",
          label: "很有想法的",
        },
        {
          key: "1",
          label: "专注设计",
        },
      ],
      user: [
        {
          id: "xxx1",
          title: "Alipay",
          logo: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
          description: "那是一种内在的东西，他们到达不了，也无法触摸的",
          updatedAt: "2024-10-19T12:24:55.374Z",
          member: "科学搬砖组",
          href: "",
          memberLink: "",
        },
        {
          id: "xxx2",
          title: "Angular",
          logo: "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
          description: "希望是一个好东西，也许是最好的，好东西是不会消亡的",
          updatedAt: "2017-07-24T00:00:00.000Z",
          member: "全组都是吴彦祖",
          href: "",
          memberLink: "",
        },
      ],
      notifyCount: 12,
      unreadCount: 11,
      country: "China",
      geographic: {
        province: {
          label: "浙江省",
          key: "330000",
        },
        city: {
          label: "杭州市",
          key: "330100",
        },
      },
      address: "西湖区工专路 77 号",
      phone: "0752-268888888",
    };
  }

  /**
   * 获取用户设置
   * @returns 返回用户设置
   */
  @All("/setting.json", )
  public async setting(): Promise<any> {
    // 返回用户设置
    return {
      name: "jack hao",
      avatar:
        "https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png",
      userid: "00000001",
      email: "jian198001@163.com",
      signature: "签名文字",
      title: "交互专家",
      group: "某某技术部－UED",
      tags: [
        {
          key: "0",
          label: "很有想法的",
        },
        {
          key: "1",
          label: "专注设计",
        },
      ],
      notifyCount: 12,
      unreadCount: 11,
      country: "China",
      geographic: {
        province: {
          label: "浙江省",
          key: "330000",
        },
        city: {
          label: "杭州市",
          key: "330100",
        },
      },
      address: "西湖区工专路 77 号",
      phone: "0752-268888888",
    };
  }

  @All("/center.json", )
  public async center(): Promise<any> {
    return {
      list: [
        {
          id: "fake-list-0",
          owner: "付小小",
          title: "Alipay",
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
          cover:
            "https://gw.alipayobjects.com/zos/rmsportal/uMfMFlvUuceEyPpotzlq.png",
          status: "active",
          percent: 62,
          logo: "https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png",
          href: "https://ant.design",
          updatedAt: 1729345965099,
          createdAt: 1729345965099,
          subDescription: "那是一种内在的东西， 他们到达不了，也无法触摸的",
          description:
            "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
          activeUser: 149968,
          newUser: 1381,
          star: 170,
          like: 181,
          message: 18,
          content:
            "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
          members: [
            {
              avatar:
                "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
              name: "曲丽丽",
              id: "member1",
            },
            {
              avatar:
                "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
              name: "王昭君",
              id: "member2",
            },
            {
              avatar:
                "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
              name: "董娜娜",
              id: "member3",
            },
          ],
        },
        {
          id: "fake-list-1",
          owner: "曲丽丽",
          title: "Angular",
          avatar:
            "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
          cover:
            "https://gw.alipayobjects.com/zos/rmsportal/iZBVOIhGJiAnhplqjvZW.png",
          status: "exception",
          percent: 58,
          logo: "https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png",
          href: "https://ant.design",
          updatedAt: 1729338765099,
          createdAt: 1729338765099,
          subDescription: "希望是一个好东西，也许是最好的，好东西是不会消亡的",
          description:
            "在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。",
          activeUser: 161529,
          newUser: 1374,
          star: 157,
          like: 118,
          message: 13,
          content:
            "段落示意：蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。蚂蚁金服设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态，提供跨越设计与开发的体验解决方案。",
          members: [
            {
              avatar:
                "https://gw.alipayobjects.com/zos/rmsportal/ZiESqWwCXBRQoaPONSJe.png",
              name: "曲丽丽",
              id: "member1",
            },
            {
              avatar:
                "https://gw.alipayobjects.com/zos/rmsportal/tBOxZPlITHqwlGjsJWaF.png",
              name: "王昭君",
              id: "member2",
            },
            {
              avatar:
                "https://gw.alipayobjects.com/zos/rmsportal/sBxjgqiuHMGRkIjqlQCd.png",
              name: "董娜娜",
              id: "member3",
            },
          ],
        },
      ],
    };
  }
}
