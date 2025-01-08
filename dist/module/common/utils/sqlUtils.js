"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mulColumnLike = exports.intersectionTime = exports.whereOrFilters = exports.query = exports.rulesCombinator = exports.whereOr = exports.toStrOrNum = exports.getStart = exports.selectPage = exports.selectCount = exports.limit = exports.orderBy = exports.like = exports.where = exports.mypairs = void 0;
const _ = require("lodash");
const arrayUtils = require("./arrayUtils");
const objUtils = require('./objUtils'), moment = require('moment');
function mypairs(obj = {}) {
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
    var _a;
    if (!obj) {
        return null;
    }
    obj = (_a = objUtils === null || objUtils === void 0 ? void 0 : objUtils.snakeCase) === null || _a === void 0 ? void 0 : _a.call(objUtils, obj);
    let pairs = _ === null || _ === void 0 ? void 0 : _.toPairs(obj);
    if (!pairs) {
        return null;
    }
    pairs.forEach(item => {
        item[1] = toStrOrNum(item[1]);
    });
    pairs = pairs.filter(item => {
        return item[1] !== null && item[1] !== undefined;
    });
    if (!pairs) {
        return null;
    }
    return pairs;
}
exports.mypairs = mypairs;
function where(obj = {}, tableName = '') {
    /**
     *
     * 生成WHERE SQL语句
     *
     * 输入 obj = { trueName: 'jack hao', sex: '1' }, tableName = 'staffInfo'
     *
     * 输出 AND staff_info.true_name = 'jack hao' AND staff_info.sex = '1'
     *
     */
    var _a, _b;
    if (!obj) {
        return ' ';
    }
    tableName = (_a = _ === null || _ === void 0 ? void 0 : _.snakeCase) === null || _a === void 0 ? void 0 : _a.call(_, tableName);
    obj = (_b = objUtils === null || objUtils === void 0 ? void 0 : objUtils.snakeCase) === null || _b === void 0 ? void 0 : _b.call(objUtils, obj);
    const pairs = mypairs(obj);
    if (!pairs) {
        return ' ';
    }
    let sql = ' ';
    pairs.forEach(item => {
        var _a, _b;
        sql = sql + ' AND ';
        const itemElement = item[1];
        let t = '';
        if (tableName) {
            t = ' ' + tableName + '.';
        }
        if ((_ === null || _ === void 0 ? void 0 : _.isNumber(itemElement)) || itemElement.indexOf('DATE_format?.(') > 0) {
            sql = sql + t + ((_a = _ === null || _ === void 0 ? void 0 : _.head) === null || _a === void 0 ? void 0 : _a.call(_, item)) + ' = ' + itemElement + ' ';
        }
        else {
            sql = sql + t + ((_b = _ === null || _ === void 0 ? void 0 : _.head) === null || _b === void 0 ? void 0 : _b.call(_, item)) + " = '" + itemElement + "' ";
        }
    });
    return sql;
}
exports.where = where;
function like(columns = [], searchValues = '', formName = 't') {
    var _a, _b;
    let sql = ' ';
    const searchValueArr = (_a = _ === null || _ === void 0 ? void 0 : _.split) === null || _a === void 0 ? void 0 : _a.call(_, searchValues, ' ');
    if (!(searchValues) ||
        !(columns) ||
        !(searchValueArr)) {
        return sql;
    }
    formName = (_b = _ === null || _ === void 0 ? void 0 : _.snakeCase) === null || _b === void 0 ? void 0 : _b.call(_, formName);
    sql = sql + ' AND ( (1 < 0) ';
    columns.forEach(item => {
        var _a;
        item = (_a = _ === null || _ === void 0 ? void 0 : _.snakeCase) === null || _a === void 0 ? void 0 : _a.call(_, item);
        searchValueArr.forEach(itemSearchValue => {
            sql += ` OR ( ${formName}.${item} LIKE '%${itemSearchValue}%' ) `;
        });
    });
    sql = sql + ' ) ';
    return sql;
}
exports.like = like;
function orderBy(sortName = ' order_num ', tableName = ' t', sortOrder = ' ASC ') {
    /**
     *
     * 生成 ORDER BY SQL语句
     *
     * 输入 sortName = ' price '
     *
     * 输出 ORDER BY t.price ASC
     *
     */
    var _a, _b;
    sortName = (_a = _ === null || _ === void 0 ? void 0 : _.snakeCase) === null || _a === void 0 ? void 0 : _a.call(_, sortName);
    tableName = (_b = _ === null || _ === void 0 ? void 0 : _.snakeCase) === null || _b === void 0 ? void 0 : _b.call(_, tableName);
    let t = ' ';
    if (tableName) {
        t = ` ${tableName}.`;
    }
    return ` ORDER BY ${t}${sortName} ${sortOrder} `;
}
exports.orderBy = orderBy;
function limit(startRow = 0, pageSize = 20, total) {
    /**
     * 生成LIMIT SQL语句
     *
     * 输入 startRow = 20
     *
     * 输出 LIMIT 20, 20
     *
     */
    if ((_ === null || _ === void 0 ? void 0 : _.isNil(startRow)) || startRow < 0) {
        startRow = 0;
    }
    if ((_ === null || _ === void 0 ? void 0 : _.isNil(pageSize)) || pageSize < 1) {
        pageSize = total;
    }
    return ` LIMIT ${startRow}, ${pageSize} `;
}
exports.limit = limit;
function selectCount(fromSql = '', whereSql = '') {
    /**
     * 生成 SELECT COUNT(*) AS count_0 SQL语句，计算符合条件的数据数量，为分页的total准备数据
     */
    return ` SELECT COUNT(*) AS count_0 ${fromSql} WHERE 1>0 ${whereSql} `;
}
exports.selectCount = selectCount;
function selectPage(selectSql = '', fromSql = '', whereSql = '', orderBySql = ' ORDER BY t.create_date DESC ', limitSql = ' LIMIT 0, 20 ') {
    return (selectSql +
        ' ' +
        fromSql +
        ' WHERE 1>0 ' +
        whereSql +
        ' ' +
        orderBySql +
        ' ' +
        limitSql);
}
exports.selectPage = selectPage;
function getStart(pageNum = 1, pageSize = 20) {
    return (pageNum - 1) * pageSize;
}
exports.getStart = getStart;
function toStrOrNum(obj = '') {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    if ((_a = _ === null || _ === void 0 ? void 0 : _.isNil) === null || _a === void 0 ? void 0 : _a.call(_, obj)) {
        return null;
    }
    if (((_b = _ === null || _ === void 0 ? void 0 : _.isNull) === null || _b === void 0 ? void 0 : _b.call(_, obj)) || ((_c = _ === null || _ === void 0 ? void 0 : _.isUndefined) === null || _c === void 0 ? void 0 : _c.call(_, obj))) {
        return null;
    }
    if ((_d = _ === null || _ === void 0 ? void 0 : _.isBoolean) === null || _d === void 0 ? void 0 : _d.call(_, obj)) {
        if (obj) {
            return '1';
        }
        return '0';
    }
    if ((_e = _ === null || _ === void 0 ? void 0 : _.isDate) === null || _e === void 0 ? void 0 : _e.call(_, obj)) {
        return (" DATE_format?.('" +
            ((_g = (_f = moment(obj)) === null || _f === void 0 ? void 0 : _f.format) === null || _g === void 0 ? void 0 : _g.call(_f, 'YYYY-MM-DD HH:mm:ss')) +
            "', '%Y-%m-%d %H:%i:%S') ");
    }
    if (((_h = _ === null || _ === void 0 ? void 0 : _.isFinite) === null || _h === void 0 ? void 0 : _h.call(_, obj)) || ((_j = _ === null || _ === void 0 ? void 0 : _.isInteger) === null || _j === void 0 ? void 0 : _j.call(_, obj))) {
        return obj;
    }
    if ((_k = _ === null || _ === void 0 ? void 0 : _.isNaN) === null || _k === void 0 ? void 0 : _k.call(_, obj)) {
        return null;
    }
    if ((_l = _ === null || _ === void 0 ? void 0 : _.isNative) === null || _l === void 0 ? void 0 : _l.call(_, obj)) {
        return null;
    }
    if ((_m = _ === null || _ === void 0 ? void 0 : _.isNumber) === null || _m === void 0 ? void 0 : _m.call(_, obj)) {
        return obj;
    }
    if ((_o = _ === null || _ === void 0 ? void 0 : _.isSafeInteger) === null || _o === void 0 ? void 0 : _o.call(_, obj)) {
        return obj;
    }
    if ((_p = _ === null || _ === void 0 ? void 0 : _.isString) === null || _p === void 0 ? void 0 : _p.call(_, obj)) {
        return obj;
    }
    if ((_q = _ === null || _ === void 0 ? void 0 : _.isSymbol) === null || _q === void 0 ? void 0 : _q.call(_, obj)) {
        return null;
    }
    return null;
}
exports.toStrOrNum = toStrOrNum;
function whereOr(columnName = 'id', columnIds = []) {
    var _a, _b;
    let whereSql = ' ';
    if (!columnIds)
        return whereSql;
    columnName = (_a = _ === null || _ === void 0 ? void 0 : _.snakeCase) === null || _a === void 0 ? void 0 : _a.call(_, columnName);
    whereSql += ' AND ( ';
    (_b = columnIds === null || columnIds === void 0 ? void 0 : columnIds.forEach) === null || _b === void 0 ? void 0 : _b.call(columnIds, (item, index) => {
        if (index < 1) {
            whereSql += ' t.' + columnName + ` = '${item}' `;
        }
        else {
            whereSql += ' OR t.' + columnName + ` = '${item}' `;
        }
    });
    whereSql += ' ) ';
    return whereSql;
}
exports.whereOr = whereOr;
function ruleStr(rule = {}) {
    let whereSql = ' ';
    const { field, operator, valueSource, value } = rule;
    if (operator === 'contains') {
        whereSql += ` ( ${field} LIKE '%${value}%' ) `;
        return whereSql;
    }
    else if (operator === 'beginsWith') {
        whereSql += ` ( ${field} LIKE '${value}%' ) `;
        return whereSql;
    }
    else if (operator === 'endsWith') {
        whereSql += ` ( ${field} LIKE '%${value}' ) `;
        return whereSql;
    }
    else if (operator === 'null') {
        whereSql += ` ( ${field} IS NULL OR ${field} = '' ) `;
        return whereSql;
    }
    else if (operator === 'notNull') {
        whereSql += ` ( ${field} IS NOT NULL AND ${field} != '' ) `;
        return whereSql;
    }
    else if (operator === '>' || operator === '<' || operator === '<=' || operator === '>=') {
        whereSql += ` ( ${field} ${operator} ${value} ) `;
        return whereSql;
    }
    console.log(valueSource);
    whereSql += ` ( ${field} ${operator} '${value}' ) `;
    return whereSql;
}
function rulesCombinator(rule = {}) {
    let whereSql = ' ';
    let { combinator, rules } = rule;
    if (!rule) {
        return whereSql;
    }
    if (combinator === 'or') {
        combinator = ' OR ';
    }
    else {
        combinator = ' AND ';
    }
    whereSql += ' ( ';
    for (let i = 0; i < (rules === null || rules === void 0 ? void 0 : rules.length); i++) {
        if (i > 0) {
            whereSql += combinator;
        }
        const r = rules === null || rules === void 0 ? void 0 : rules[i];
        whereSql += ruleStr === null || ruleStr === void 0 ? void 0 : ruleStr(r);
    }
    whereSql += ' ) ';
    return whereSql;
}
exports.rulesCombinator = rulesCombinator;
function query(query = '') {
    var _a;
    let whereSql = ' ';
    if (!query)
        return whereSql;
    const queryObj = (_a = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _a === void 0 ? void 0 : _a.call(JSON, decodeURIComponent === null || decodeURIComponent === void 0 ? void 0 : decodeURIComponent(query));
    whereSql += ' AND ' + (rulesCombinator === null || rulesCombinator === void 0 ? void 0 : rulesCombinator(queryObj));
    return whereSql;
}
exports.query = query;
function whereOrFilters(filtersStr = '') {
    var _a, _b, _c;
    let whereSql = ' ';
    if (!filtersStr)
        return whereSql;
    const filters = (_a = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _a === void 0 ? void 0 : _a.call(JSON, decodeURIComponent === null || decodeURIComponent === void 0 ? void 0 : decodeURIComponent(filtersStr));
    if (!filters)
        return whereSql;
    const filterObj = (_b = arrayUtils === null || arrayUtils === void 0 ? void 0 : arrayUtils.getKeyObj) === null || _b === void 0 ? void 0 : _b.call(arrayUtils, filters);
    const filterKeys = (_c = _ === null || _ === void 0 ? void 0 : _.keys) === null || _c === void 0 ? void 0 : _c.call(_, filterObj);
    for (const key of filterKeys) {
        whereSql += whereOr === null || whereOr === void 0 ? void 0 : whereOr(key, filterObj === null || filterObj === void 0 ? void 0 : filterObj[key]);
    }
    return whereSql;
}
exports.whereOrFilters = whereOrFilters;
function intersectionTime(start = '', end = '', startColumnName = '', endColumnName = '') {
    // 判断两个时间区间是否有交集
    const sql = ` AND ( ${startColumnName} < STR_TO_DATE('${end}', '%Y-%m-%d %H:%i:%s') AND ${endColumnName} > STR_TO_DATE('${start}', '%Y-%m-%d %H:%i:%s') ) `;
    return sql;
}
exports.intersectionTime = intersectionTime;
function mulColumnLike(arr, formName = 't') {
    var _a;
    if (!arr || (arr === null || arr === void 0 ? void 0 : arr.length) < 1) {
        return ' ';
    }
    let sql = ' AND ( 1>0 ';
    for (const item of arr) {
        const label = (_a = _ === null || _ === void 0 ? void 0 : _.snakeCase) === null || _a === void 0 ? void 0 : _a.call(_, item === null || item === void 0 ? void 0 : item.label);
        sql += ` AND ${formName}.${label} LIKE '%${item === null || item === void 0 ? void 0 : item.value}%' `;
    }
    sql += ' ) ';
    return sql;
}
exports.mulColumnLike = mulColumnLike;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3FsVXRpbHMuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZS9jb21tb24vdXRpbHMvc3FsVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNEJBQTZCO0FBRTdCLDJDQUEyQztBQUUzQyxNQUFNLFFBQVEsR0FBUSxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQ3pDLE1BQU0sR0FBUSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFbEMsU0FBZ0IsT0FBTyxDQUFDLE1BQVcsRUFBRTtJQUNuQzs7Ozs7Ozs7O09BU0c7O0lBRUgsSUFBSSxDQUFDLEdBQUcsRUFBRTtRQUNSLE9BQU8sSUFBSSxDQUFBO0tBQ1o7SUFFRCxHQUFHLEdBQUcsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsU0FBUyx5REFBRyxHQUFHLENBQUMsQ0FBQztJQUVqQyxJQUFJLEtBQUssR0FBUSxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWpDLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDVixPQUFPLElBQUksQ0FBQTtLQUNaO0lBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUNuQixJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLENBQUMsQ0FBQyxDQUFDO0lBRUgsS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDMUIsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLENBQUM7SUFDbkQsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsT0FBTyxJQUFJ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