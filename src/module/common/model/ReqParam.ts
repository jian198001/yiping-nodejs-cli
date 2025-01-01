/**
 * 请求参数模型类
 */
export class ReqParam {
  /**
   * 过滤条件，默认为空字符串
   */
  public filters = '';

  /**
   * 搜索值，默认为空字符串
   */
  public searchValue = '';

  /**
   * 排序字段，默认为'order_num'
   */
  public sortName = ' order_num ';

  /**
   * 排序顺序，默认为'ASC'
   */
  public sortOrder = ' ASC ';

  /**
   * 标签值，默认为空字符串
   */
  public tabVal = '';

  /**
   * 令牌，默认为空字符串
   */
  public token = '';
}
