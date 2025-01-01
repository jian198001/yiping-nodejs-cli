/**
 * 执行SQL查询并返回结果
 * 
 * @param {string} sql - 要执行的SQL查询语句，默认为空字符串
 * @param {Object} mysqlConf - MySQL数据库连接配置对象，默认为本地测试数据库配置
 * @param {string} dataSourceName - 数据源名称，默认为'default'
 * @returns {Promise<any[]>} 返回一个Promise，解析为查询结果数组
 */
export async function query(
  sql = ' ',
  mysqlConf = {
    dataSource: {
      default: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '',
        database: 'test',
      },
    },
  },
  dataSourceName = 'default'
): Promise<any[]> {
  // 获取指定数据源的配置
  const conf = mysqlConf?.dataSource[dataSourceName];

  // 如果配置中存在username属性，则将其赋值给user属性
  conf.user = conf?.username;

  // 导入mysql模块
  const mysql = require('mysql');

  // 创建数据库连接
  const conn = mysql?.createConnection(conf);

  // 连接到数据库
  conn?.connect();

  // 返回一个Promise，用于执行查询并处理结果
  return new Promise((resolve, reject) => {
    // 执行查询
    conn?.query?.(sql, (err, rows) => {
      // 如果发生错误
      if (err) {
        // 拒绝Promise并传递错误信息
        reject(err);

        // 关闭数据库连接
        conn?.end();
      } else {
        // 解析Promise并传递查询结果
        resolve(rows);

        // 关闭数据库连接
        conn?.end();
      }
    });
  });
}
