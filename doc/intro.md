介绍
yiping-midway-cli 是一平前端架构团队，基于渐进式理念研发的 Node.js 框架，通过自研的依赖注入容器，搭配各种上层模块，组合出适用于不同场景的解决方案。

yiping-midway-cli 基于 TypeScript 开发，结合了面向对象（OOP + Class + IoC）与函数式（FP + Function + Hooks）两种编程范式，并在此之上支持了 Web / 全栈 / 微服务 / RPC / Socket / Serverless 等多种场景，致力于为用户提供简单、易用、可靠的 Node.js 服务端研发体验。

为什么要有 yiping-midway-cli
社区上也有很多类似的框架，那为什么还需要 yiping-midway-cli ？

原因有三点：

yiping-midway-cli 是一平内部一直持续在研发的框架，需要有面向应用层面的框架来和集团场景对接
全量使用 TypeScript 是未来一段时间的趋势，面向未来去迭代和研发是作为架构组创新的要求
虽然社区已经有 nest 这样的框架，但是这些产品的维护、协作、修改都会受到商业化产品的制约，也无法做到需求的快速迭代和安全性保障，整体的研发理念也和我们不同，为此，我们需要有一套自研的框架体系
我们的优势
yiping-midway-cli 框架是在内部已经使用 5 年以上的 Node.js 框架，有着长期投入和持续维护的团队做后盾
已经在每年的大促场景经过考验，稳定性无须担心
丰富的组件和扩展能力，例如数据库，缓存，定时任务，进程模型，部署以及 Web，Socket 甚至 Serverless 等新场景的支持
一体化调用方案可以方便快捷和前端页面协同开发
良好的 TypeScript 定义支持
国产化文档和沟通容易简单
多编程范式
yiping-midway-cli 支持面向对象与函数式两种编程范式，你可以根据实际研发的需要，选择不同的编程范式来开发应用。

面向对象（OOP + Class + IoC）
yiping-midway-cli 支持面向对象的编程范式，为应用提供更优雅的架构。

下面是基于面向对象，开发路由的示例。

// src/controller/home.ts
import { Controller, Get } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';

import _ = require('lodash');

@Controller('/')
export class HomeController {

  @Inject()
  ctx: Context

  @Get('/')
  async home() {
    return {
      message: 'Hello yiping-midway-clijs!',
      query: this?.ctx.ip
    }
  }
}

函数式（FP + Function + Hooks）
yiping-midway-cli 也支持函数式的编程范式，为应用提供更高的研发效率。

下面是基于函数式，开发路由接口的示例。

// src/api/index.ts

import { useContext } from '@midwayjs/hooks'
import { Context } from '@midwayjs/koa';

export default async function home () {
  const ctx = useContext<Context>()

  return {
    message: 'Hello yiping-midway-clijs!',
    query: ctx.ip
  }
}

环境准备工作
yiping-midway-cli 运行请预先安装 Node.js 环境和 npm，在国内可以使用 cnpm。

操作系统：支持 macOS，Linux，Windows
运行环境：建议选择 LTS 版本，最低要求 12.11.0。