/**
 * 执行SQL查询并返回结果
 *
 * @param {string} sql - 要执行的SQL查询语句，默认为空字符串
 * @param {Object} mysqlConf - MySQL数据库连接配置对象，默认为本地测试数据库配置
 * @param {string} dataSourceName - 数据源名称，默认为'default'
 * @returns {Promise<any[]>} 返回一个Promise，解析为查询结果数组
 */
export declare function query(sql?: string, mysqlConf?: {
    dataSource: {
        default: {
            host: string;
            port: number;
            user: string;
            password: string;
            database: string;
        };
    };
}, dataSourceName?: string): Promise<any[]>;
