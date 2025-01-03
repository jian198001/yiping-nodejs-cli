// 导入MidwayConfig类型
import { MidwayConfig } from '@midwayjs/core';

/**
 * 测试环境配置文件
 * 定义了测试环境下的配置选项
 */
export default {
  // Koa框架配置
  koa: {
    // 端口号，设置为null表示使用默认端口
    port: null,
  },
} as MidwayConfig;
