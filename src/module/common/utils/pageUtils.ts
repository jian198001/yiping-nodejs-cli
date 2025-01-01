import _ = require('lodash');

/**
 * 处理默认排序参数
 * 
 * @param {any} reqParam - 请求参数对象
 * @returns {any} 返回处理后的请求参数对象
 */
export function defaultSort(reqParam: any): any {
  // 如果请求参数为空，则返回空对象
  if (!reqParam) {
    return {};
  }

  // 去除排序字段的前后空格
  let sortName: string = _?.trim?.(reqParam?.sortName);

  // 去除排序顺序的前后空格
  let sortOrder: string = _?.trim?.(reqParam?.sortOrder);

  // 如果排序字段中包含空格
  if (sortName.indexOf(' ') > -1) {
    // 处理uni-app的排序字段
    const sortNameTmp: string[] = _?.split?.(sortName, ' ');

    // 如果排序顺序为空，则使用排序字段中的第二个部分作为排序顺序
    if (!sortOrder) {
      sortOrder = _?.toUpper(sortNameTmp[1]);
    }

    // 使用排序字段中的第一个部分作为排序字段
    sortName = _?.head?.(sortNameTmp);
  }

  // 如果排序字段中不包含空格
  if (sortName.indexOf(' ') < 0) {
    // 将排序字段转换为蛇形命名法
    sortName = _?.snakeCase?.(sortName);
  }

  // 如果排序字段为空，则使用默认值'order_num'
  if (!sortName) {
    sortName = ' order_num ';
  }

  // 如果排序顺序为空，则使用默认值'DESC'
  if (!sortOrder) {
    sortOrder = ' DESC ';
  }

  // 如果排序字段中包含'ASC'
  if (_?.toUpper(sortName).indexOf(' ASC') > -1) {
    // 去除排序字段中的'ASC'
    sortName = _?.replace?.(sortName, ' ASC', '');

    // 去除排序字段中的'asc'
    sortName = _?.replace?.(sortName, ' asc', '');

    // 设置排序顺序为'ASC'
    sortOrder = ' ASC ';
  }

  // 如果排序字段中包含'DESC'
  if (_?.toUpper(sortName).indexOf(' DESC') > -1) {
    // 去除排序字段中的'DESC'
    sortName = _?.replace?.(sortName, ' DESC', '');

    sortName = _?.replace?.(sortName, ' desc', '');

    sortOrder = ' DESC ';
  }

  reqParam.sortName = sortName;

  reqParam.sortOrder = _?.toUpper(sortOrder);

  return reqParam;
}
