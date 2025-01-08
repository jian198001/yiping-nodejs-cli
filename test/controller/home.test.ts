import { close, createApp, createHttpRequest } from '@midwayjs/mock';
import { Framework } from '@midwayjs/koa';

/**
 * 测试控制器的测试套件
 * 
 * 该测试套件包含了对应用程序的根路径（'/'）的GET请求的测试。
 */
describe('test/controller/home.test.ts', () => {

  /**
   * 测试根路径的GET请求
   * 
   * 该测试用例创建了一个应用程序实例，并向根路径发送GET请求。
   * 然后，它验证了响应的状态码是否为200。
   */
  it('should GET /', async () => {
    // 创建应用程序实例
    const app = await createApp<Framework>();

    // 发送GET请求到根路径
    const result = await createHttpRequest(app).get('/');

    // 使用Jest的expect断言库验证响应的状态码是否为200
    expect(result.status).toBe(200);
    // expect(result.text).toBe('Hello Midwayjs!');

    // 关闭应用程序实例
    await close(app);
  });

});
