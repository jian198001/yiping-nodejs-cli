/**
 * 分页数据模型类
 */
export class Page {
  /**
   * 当前页码，默认为1
   */
  public pageNum = 1;

  /**
   * 每页显示的记录数，默认为20
   */
  public pageSize = 20;

  /**
   * 当前页的起始行号，默认为0
   */
  public startRow = 0;

  /**
   * 总记录数，默认为0
   */
  public total = 0;

  /**
   * 当前页的数据列表，默认为空数组
   */
  public list: any[] = [];
}
