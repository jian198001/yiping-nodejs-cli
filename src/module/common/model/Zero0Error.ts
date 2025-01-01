/**
 * 导入Midway框架的MidwayError类，用于创建自定义错误
 */
import { MidwayError } from '@midwayjs/core';

/**
 * 自定义错误类，继承自MidwayError
 */
export class Zero0Error extends MidwayError {
  /**
   * 构造函数，用于创建Zero0Error实例
   * 
   * @param {string} message - 错误消息
   * @param {string} code - 错误代码
   */
  constructor(message: string, code: string) {
    // 调用父类的构造函数，传递错误消息、错误代码和一个空对象作为扩展信息
    super(message, code, {});
  }
}
