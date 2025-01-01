import _ = require('lodash');

export function camelCase(obj: any): any {
  /**
   * 将对象的属性名，加上驼峰命名法的形式
   *
   * 输入 obj = { test_abc: '123', ab_cde: '555', }
   *
   * 输出 obj = { test_abc: '123', ab_cde: '555', testAbc: '123', abCde: '555', }
   *
   * 将数据库返回的数据列名，变成对象属性名
   *
   */

  const keys: any = _?.keys(obj)

  keys.forEach(item => {
    const camelCase = _?.camelCase?.(item)

    obj[camelCase] = obj?.[item]
  });

  return obj;
}

export function snakeCase(obj: any): any {
  /**
   * 将对象的属性名，变成蛇形命名法的形式
   *
   * 输入 obj = { testAbc: '123', abCde: '555', }
   *
   * 输出 obj = { test_abc: '123', ab_cde: '555', }
   *
   * 方便生成数据库insert和update sql时使用
   *
   */

  let _obj: any = _?.cloneDeep(obj)

  const keys: any = _?.keys(_obj)

  keys.forEach(item => {
    const snakeCase: any = _?.snakeCase?.(item)

    _obj[snakeCase] = _obj?.[item]

    if (item !== snakeCase) {
      _obj = _?.omit(_obj, [item])
    }
  })

  return _obj
}
