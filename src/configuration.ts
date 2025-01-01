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

@Configuration({
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
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    this?.app.useMiddleware([FormatMiddleware]);
  }
}
