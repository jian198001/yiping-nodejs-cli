import { Controller, All } from "@midwayjs/decorator";

/**
 * 网站首页控制器
 */
@Controller("/")
export class IndexController {
  /**
   * 网站正在建设中的HTML内容
   */
  private static html =
    '<html><body><br></br><span><center>网站正在建设中</center></span><br></br><br></br><span><center><a href="https://beian.miit.gov.cn/" target="_blank">ICP备案：冀ICP备2023034445号</a></center></span><br></br></body></html>';

  /**
   * 处理/index.html路径的请求
   * 
   * @returns 返回重定向到登录页面的HTML内容
   */
  @All("/index.html")
  public async index(): Promise<string> {
    // 修改HTML内容，重定向到登录页面
    IndexController.html = `<html>
<body>
  <script language="javascript" type="text/javascript">
    window.location.href = "public/index.html#/login?redirect=/index";
  </script>
</body>
</html>`;

    // 返回修改后的HTML内容
    return IndexController.html;
  }

  /**
   * 处理根路径的请求
   * 
   * @returns 返回网站正在建设中的HTML内容
   */
  @All("/")
  public async root(): Promise<string> {
    // 返回网站正在建设中的HTML内容
    return IndexController.html;
  }
}
