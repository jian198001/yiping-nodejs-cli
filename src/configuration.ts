// 导入依赖项
import { App, Configuration } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as orm from '@midwayjs/typeorm';
import * as jwt from '@midwayjs/jwt';
import * as swagger from '@midwayjs/swagger';
import { join } from 'path';
import * as captcha from '@midwayjs/captcha';
import * as staticFile from '@midwayjs/static-file';

import * as upload from '@midwayjs/upload';
import * as view from '@midwayjs/view-ejs';  
import * as ws from '@midwayjs/ws';
import * as cron from '@midwayjs/cron';
import * as passport from '@midwayjs/passport';
import * as crossDomain from '@midwayjs/cross-domain';
import { FormatMiddleware } from './middleware/format.middleware';

/**
 * 应用配置类
 * 导入各种MidwayJS组件和自定义中间件
 */
@Configuration({
  // 导入的组件列表
  imports: [
    koa,
    validate,
    staticFile,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    upload,
    view,
    orm,
    jwt,
    swagger,
    captcha, 
    ws,
    cron,
    passport,
    crossDomain,
  ],
  // 导入配置文件的路径
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  /**
   * 应用启动时执行的钩子函数
   * 注册自定义中间件
   */
  async onReady() {
    // 使用FormatMiddleware中间件
    this?.app.useMiddleware([FormatMiddleware]);
  }
}
