"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
/**
 * 执行SQL查询并返回结果
 *
 * @param {string} sql - 要执行的SQL查询语句，默认为空字符串
 * @param {Object} mysqlConf - MySQL数据库连接配置对象，默认为本地测试数据库配置
 * @param {string} dataSourceName - 数据源名称，默认为'default'
 * @returns {Promise<any[]>} 返回一个Promise，解析为查询结果数组
 */
async function query(sql = ' ', mysqlConf = {
    dataSource: {
        default: {
            host: 'localhost',
            port: 3306,
            user: 'root',
            password: '',
            database: 'test',
        },
    },
}, dataSourceName = 'default') {
    // 获取指定数据源的配置
    const conf = mysqlConf === null || mysqlConf === void 0 ? void 0 : mysqlConf.dataSource[dataSourceName];
    // 如果配置中存在username属性，则将其赋值给user属性
    conf.user = conf === null || conf === void 0 ? void 0 : conf.username;
    // 导入mysql模块
    const mysql = require('mysql');
    // 创建数据库连接
    const conn = mysql === null || mysql === void 0 ? void 0 : mysql.createConnection(conf);
    // 连接到数据库
    conn === null || conn === void 0 ? void 0 : conn.connect();
    // 返回一个Promise，用于执行查询并处理结果
    return new Promise((resolve, reject) => {
        var _a;
        // 执行查询
        (_a = conn === null || conn === void 0 ? void 0 : conn.query) === null || _a === void 0 ? void 0 : _a.call(conn, sql, (err, rows) => {
            // 如果发生错误
            if (err) {
                // 拒绝Promise并传递错误信息
                reject(err);
                // 关闭数据库连接
                conn === null || conn === void 0 ? void 0 : conn.end();
            }
            else {
                // 解析Promise并传递查询结果
                resolve(rows);
                // 关闭数据库连接
                conn === null || conn === void 0 ? void 0 : conn.end();
            }
        });
    });
}
exports.query = query;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXlzcWwuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZS9jb21tb24vZGFvL215c3FsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7Ozs7O0dBT0c7QUFDSSxLQUFLLFVBQVUsS0FBSyxDQUN6QixHQUFHLEdBQUcsR0FBRyxFQUNULFNBQVMsR0FBRztJQUNWLFVBQVUsRUFBRTtRQUNWLE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxXQUFXO1lBQ2pCLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxFQUFFLE1BQU07WUFDWixRQUFRLEVBQUUsRUFBRTtZQUNaLFFBQVEsRUFBRSxNQUFNO1NBQ2pCO0tBQ0Y7Q0FDRixFQUNELGNBQWMsR0FBRyxTQUFTO0lBRTFCLGFBQWE7SUFDYixNQUFNLElBQUksR0FBRyxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsVUFBVSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRW5ELGlDQUFpQztJQUNqQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxRQUFRLENBQUM7SUFFM0IsWUFBWTtJQUNaLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUUvQixVQUFVO0lBQ1YsTUFBTSxJQUFJLEdBQUcsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0lBRTNDLFNBQVM7SUFDVCxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsT0FBTyxFQUFFLENBQUM7SUFFaEIsMEJBQTBCO0lBQzFCLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7O1FBQ3JDLE9BQU87UUFDUCxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxLQUFLLHFEQUFHLEdBQUcsRUFBRSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtZQUMvQixTQUFTO1lBQ1QsSUFBSSxHQUFHLEVBQUU7Z0JBQ1AsbUJBQW1CO2dCQUNuQixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBRVosVUFBVTtnQkFDVixJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsR0FBRyxFQUFFLENBQUM7YUFDYjtpQkFBTTtnQkFDTCxtQkFBbUI7Z0JBQ25CLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFZCxVQUFVO2dCQUNWLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxHQUFHLEVBQUUsQ0FBQzthQUNiO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFsREQsc0JBa0RDIn0=