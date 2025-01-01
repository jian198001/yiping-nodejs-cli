/**
 * 结果模型类，用于封装API返回的数据
 */
export class Result {
  /**
   * 响应状态码，默认为0
   */
  public code = 0;

  /**
   * 响应消息，默认为空字符串
   */
  public message = '';

  /**
   * 响应数据，默认为null
   */
  public data: any = null;

  /**
   * 响应消息，默认为空字符串
   */
  public msg = '';
}
