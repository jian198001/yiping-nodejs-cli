import { All, Controller } from '@midwayjs/decorator';

/**
 * 买家前端页面版本控制器
 */
@Controller('/buyer/uni/frontPage/ver')
export class BuyerUniFrontPageVerController {
  /**
   * 获取版本信息
   * 
   * @returns 返回版本信息
   */
  @All('/ver.json')
  public async ver(): Promise<any> {
    // 返回版本信息
    return {
      ver: '0.0.1', // 版本号
      title: '第一版程序', // 程序标题
      content: '程序第一版', // 程序内容
      apk: '', // APK文件路径
      ios: '', // iOS文件路径
      isForceUpdate: '0', // 是否强制更新
      appVersionCode: '0', // 应用版本代码
    };
  }
}
