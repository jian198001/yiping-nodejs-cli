import _ = require('lodash');

import * as arrayUtils from './arrayUtils';

const objUtils: any = require('./objUtils'),
  moment: any = require('moment');

export function mypairs(obj: any = {}): any {
  /**
   * 创建一个obj对象自身可枚举属性的键值对数组，每个属性名是蛇形命名法的形式
   *
   * 输入 obj = { testAbc: '123', abCde: '555', }
   *
   * 输出 [ [ 'test_abc', '123'], ['ab_cde': '555'], ]
   *
   * 方便生成数据库insert和update sql时使用
   *
   */

  if (!obj) {
     return {} 
  }

  obj = objUtils?.snakeCase?.(obj);

  let pairs: any = _?.toPairs(obj);

  if (!pairs) {
     return {} 
  }

  pairs.forEach(item => {
    item[1] = toStrOrNum(item[1]);
  });

  pairs = pairs.filter(item => {
    return item[1] !== null && item[1] !== undefined;
  });

  if (!pairs) {
     return {} 
  }

  return pairs;
}

export function where(obj: any = {}, tableName = ''): string {
  /**
   *
   * 生成WHERE SQL语句
   *
   * 输入 obj = { trueName: 'jack hao', sex: '1' }, tableName = 'staffInfo'
   *
   * 输出 AND staff_info.true_name = 'jack hao' AND staff_info.sex = '1'
   *
   */

  if (!obj) {
    return ' ';
  }

  tableName = _?.snakeCase?.(tableName);

  obj = objUtils?.snakeCase?.(obj);

  const pairs: any = mypairs(obj);

  if (!pairs) {
    return ' ';
  }

  let sql = ' ';

  pairs.forEach(item => {
    sql = sql + ' AND ';

    const itemElement: any = item[1];

    let t = '';

    if (tableName) {
      t = ' ' + tableName + '.';
    }

    if (_?.isNumber(itemElement) || itemElement.indexOf('DATE_format?.(') > 0) {
      sql = sql + t + _?.head?.(item) + ' = ' + itemElement + ' ';
    } else {
      sql = sql + t + _?.head?.(item) + " = '" + itemElement + "' ";
    }
  });

  return sql;
}

export function like(
  columns: any[] = [],
  searchValues = '',
  formName = 't'
): string {
  let sql = ' ';

  const searchValueArr: string[] = _?.split?.(searchValues, ' ');

  if (
    !(searchValues) ||
    !(columns) ||
    !(searchValueArr)
  ) {
    return sql;
  }

  formName = _?.snakeCase?.(formName);

  sql = sql + ' AND ( (1 < 0) ';

  columns.forEach(item => {
    item = _?.snakeCase?.(item);

    searchValueArr.forEach(itemSearchValue => {
      sql += ` OR ( ${formName}.${item} LIKE '%${itemSearchValue}%' ) `;
    });
  });

  sql = sql + ' ) ';

  return sql;
}

export function orderBy(
  sortName = ' order_num ',
  tableName = ' t',
  sortOrder = ' ASC '
): string {
  /**
   *
   * 生成 ORDER BY SQL语句
   *
   * 输入 sortName = ' price '
   *
   * 输出 ORDER BY t.price ASC
   *
   */

  sortName = _?.snakeCase?.(sortName);

  tableName = _?.snakeCase?.(tableName);

  let t = ' ';

  if (tableName) {
    t = ` ${tableName}.`;
  }

  return ` ORDER BY ${t}${sortName} ${sortOrder} `;
}

export function limit(startRow = 0, pageSize = 20, total: number, ): string {
  /**
   * 生成LIMIT SQL语句
   *
   * 输入 startRow = 20
   *
   * 输出 LIMIT 20, 20
   *
   */

  if (_?.isNil(startRow) || startRow < 0) {
    startRow = 0;
  }

  if (_?.isNil(pageSize) || pageSize < 1) {
    pageSize = total;
  }

  return ` LIMIT ${startRow}, ${pageSize} `;
}

export function selectCount(fromSql = '', whereSql = ''): string {
  /**
   * 生成 SELECT COUNT(*) AS count_0 SQL语句，计算符合条件的数据数量，为分页的total准备数据
   */

  return ` SELECT COUNT(*) AS count_0 ${fromSql} WHERE 1>0 ${whereSql} `;
}

export function selectPage(
  selectSql = '',
  fromSql = '',
  whereSql = '',
  orderBySql = ' ORDER BY t.create_date DESC ',
  limitSql = ' LIMIT 0, 20 '
): string {
  return (
    selectSql +
    ' ' +
    fromSql +
    ' WHERE 1>0 ' +
    whereSql +
    ' ' +
    orderBySql +
    ' ' +
    limitSql
  );
}

export function getStart(pageNum = 1, pageSize = 20): number {
  return (pageNum - 1) * pageSize;
}

export function toStrOrNum(obj = ''): string {
  if (_?.isNil?.(obj)) {
     return  ' '
  }

  if (_?.isNull?.(obj) || _?.isUndefined?.(obj)) {
     return  ' '
  }

  if (_?.isBoolean?.(obj)) {
    if (obj) {
      return '1';
    }

    return '0';
  }

  if (_?.isDate?.(obj)) {
    return (
      " DATE_format?.('" +
      moment(obj)?.format?.('YYYY-MM-DD HH:mm:ss') +
      "', '%Y-%m-%d %H:%i:%S') "
    );
  }

  if (_?.isFinite?.(obj) || _?.isInteger?.(obj)) {
    return obj;
  }

  if (_?.isNaN?.(obj)) {
     return  ' '
  }

  if (_?.isNative?.(obj)) {
     return  ' '
  }

  if (_?.isNumber?.(obj)) {
    return obj;
  }

  if (_?.isSafeInteger?.(obj)) {
    return obj;
  }

  if (_?.isString?.(obj)) {
    return obj;
  }

  if (_?.isSymbol?.(obj)) {
     return  ' ' 
  }

   return  ' '
}

export function whereOr(columnName = 'id', columnIds: any[] = []): string {
  let whereSql = ' ';

  if (!columnIds) return whereSql;

  columnName = _?.snakeCase?.(columnName);

  whereSql += ' AND ( ';

  columnIds?.forEach?.((item, index) => {
    if (index < 1) {
      whereSql += ' t.' + columnName + ` = '${item}' `;
    } else {
      whereSql += ' OR t.' + columnName + ` = '${item}' `;
    }
  });

  whereSql += ' ) ';

  return whereSql;
}

function ruleStr(rule: any = {}): string {
  let whereSql = ' ';

  const { field, operator, valueSource, value } = rule;

  if (operator === 'contains') {

    whereSql += ` ( ${field} LIKE '%${value}%' ) `;

    return whereSql;

  } else if (operator === 'beginsWith') {
    
    whereSql += ` ( ${field} LIKE '${value}%' ) `;

    return whereSql;

  } else if (operator === 'endsWith') {
    
    whereSql += ` ( ${field} LIKE '%${value}' ) `;

    return whereSql;

  } else if (operator === 'null') {
    
    whereSql += ` ( ${field} IS NULL OR ${field} = '' ) `;

    return whereSql;

  } else if (operator === 'notNull') {
    
    whereSql += ` ( ${field} IS NOT NULL AND ${field} != '' ) `;

    return whereSql;
    
  } else if (operator === '>' || operator === '<' || operator === '<=' || operator === '>=') {
    
  whereSql += ` ( ${field} ${operator} ${value} ) `;

    return whereSql;
    
  }

  console?.log?.(valueSource);

  whereSql += ` ( ${field} ${operator} '${value}' ) `;

  return whereSql;
}

export function rulesCombinator(rule: any = {}): string {
  let whereSql = ' ';

  let {combinator, rules } = rule;

  if (!rule) { return whereSql; }

  if (combinator === 'or') {

    combinator = ' OR ';

  } else {

    combinator = ' AND ';

  }

  whereSql += ' ( ';
 
  for (let i = 0; i < rules?.length; i++) {

    if (i > 0) {

      whereSql += combinator;

    }

    const r = rules?.[i];
    
    whereSql += ruleStr?.(r);

  }

  whereSql += ' ) ';
  
  return whereSql;

}

export function query(query = ''): string {
  let whereSql = ' ';

  if (!query) return whereSql;
  
  const queryObj = JSON?.parse?.(decodeURIComponent?.(query));
 
  whereSql += ' AND ' + rulesCombinator?.(queryObj);

  return whereSql;
}

export function whereOrFilters(filtersStr = ''): string {
  let whereSql = ' ';

  if (!filtersStr) return whereSql;

  const filters: any[] = JSON?.parse?.(decodeURIComponent?.(filtersStr));

  if (!filters) return whereSql;

  const filterObj: any = arrayUtils?.getKeyObj?.(filters);

  const filterKeys: string[] = _?.keys?.(filterObj);

  for (const key of filterKeys ) {  

    whereSql += whereOr?.(key, filterObj?.[key]);
  }

  return whereSql;
}

export function intersectionTime(start: string = '', end: string = '', startColumnName: string = '', endColumnName: string = ''): string {

  // 判断两个时间区间是否有交集

  const sql = ` AND ( ${startColumnName} < STR_TO_DATE('${end}', '%Y-%m-%d %H:%i:%s') AND ${endColumnName} > STR_TO_DATE('${start}', '%Y-%m-%d %H:%i:%s') ) `

  return sql

}

export function mulColumnLike(arr: any[], formName = 't'): string {

  if (!arr || arr?.length < 1) {
    
    return ' '

  }

  let sql = ' AND ( 1>0 '

  for (const item of arr) {

    const label = _?.snakeCase?.(item?.label)
    
    sql += ` AND ${formName}.${label} LIKE '%${item?.value}%' `

  }

  sql += ' ) '

  return sql

}
