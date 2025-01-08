"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.antParams2Arr = exports.uuid = exports.randomStr = exports.split = exports.random = exports.subStartEndSep = exports.isHttp = void 0;
const _ = require("lodash");
const moment = require("moment");
const path = require('path');
function isHttp(str) {
    var _a, _b;
    return ((_a = _ === null || _ === void 0 ? void 0 : _.startsWith) === null || _a === void 0 ? void 0 : _a.call(_, str, 'http://')) || ((_b = _ === null || _ === void 0 ? void 0 : _.startsWith) === null || _b === void 0 ? void 0 : _b.call(_, str, 'https://'));
}
exports.isHttp = isHttp;
function subStartEndSep(filePath) {
    var _a, _b, _c, _d, _e, _f, _g;
    if (!filePath) {
        return '';
    }
    filePath = (_a = _ === null || _ === void 0 ? void 0 : _.trim) === null || _a === void 0 ? void 0 : _a.call(_, filePath);
    filePath = (_b = path === null || path === void 0 ? void 0 : path.normalize) === null || _b === void 0 ? void 0 : _b.call(path, filePath);
    filePath = (_c = _ === null || _ === void 0 ? void 0 : _.replace) === null || _c === void 0 ? void 0 : _c.call(_, filePath, /\\/g, '/');
    if ((_d = _ === null || _ === void 0 ? void 0 : _.startsWith) === null || _d === void 0 ? void 0 : _d.call(_, filePath, '/')) {
        filePath = (_e = filePath === null || filePath === void 0 ? void 0 : filePath.substring) === null || _e === void 0 ? void 0 : _e.call(filePath, 1, filePath === null || filePath === void 0 ? void 0 : filePath.length);
    }
    if ((_f = _ === null || _ === void 0 ? void 0 : _.endsWith) === null || _f === void 0 ? void 0 : _f.call(_, filePath, '/')) {
        filePath = (_g = filePath === null || filePath === void 0 ? void 0 : filePath.substring) === null || _g === void 0 ? void 0 : _g.call(filePath, 0, (filePath === null || filePath === void 0 ? void 0 : filePath.length) - 1);
    }
    return filePath;
}
exports.subStartEndSep = subStartEndSep;
function random(str = '', separator = '|') {
    var _a, _b;
    // 将一个字符串拆分成数组，并随机返回数组中任何一个子字符串
    // 例: 'aaa|bbb|ccc|ddd|eee' 返回:ccc
    if (!str) {
        return '';
    }
    const arr = (_a = _ === null || _ === void 0 ? void 0 : _.split) === null || _a === void 0 ? void 0 : _a.call(_, str, separator);
    return arr[(_b = _ === null || _ === void 0 ? void 0 : _.random) === null || _b === void 0 ? void 0 : _b.call(_, (arr === null || arr === void 0 ? void 0 : arr.length) - 1)];
}
exports.random = random;
function split(str = '', start = '[', end = ']') {
    // 将一个字符串拆分成按start和end包起来的数组
    var _a, _b, _c, _d, _e;
    // 例如：输入'[大家|你们][早晨|上午]好，[大家|各位]辛苦了'
    //输出：[ 'ARR:大家|你们', 'ARR:早晨|上午', '好，', 'ARR:大家|各位', '辛苦了' ]
    if (!str) {
        return [];
    }
    const arr = (_a = _ === null || _ === void 0 ? void 0 : _.split) === null || _a === void 0 ? void 0 : _a.call(_, str, start);
    if ((arr === null || arr === void 0 ? void 0 : arr.length) < 2) {
        return arr;
    }
    const arrReturn = [];
    for (const strOne of arr) {
        if (!strOne) {
            continue;
        }
        const arrEnd = (_b = _ === null || _ === void 0 ? void 0 : _.split) === null || _b === void 0 ? void 0 : _b.call(_, strOne, end);
        if (arrEnd.length < 2) {
            (_c = arrReturn === null || arrReturn === void 0 ? void 0 : arrReturn.push) === null || _c === void 0 ? void 0 : _c.call(arrReturn, strOne);
        }
        if (arrEnd === null || arrEnd === void 0 ? void 0 : arrEnd[0]) {
            (_d = arrReturn === null || arrReturn === void 0 ? void 0 : arrReturn.push) === null || _d === void 0 ? void 0 : _d.call(arrReturn, 'ARR:' + (arrEnd === null || arrEnd === void 0 ? void 0 : arrEnd[0]));
        }
        if (arrEnd === null || arrEnd === void 0 ? void 0 : arrEnd[1]) {
            (_e = arrReturn === null || arrReturn === void 0 ? void 0 : arrReturn.push) === null || _e === void 0 ? void 0 : _e.call(arrReturn, arrEnd === null || arrEnd === void 0 ? void 0 : arrEnd[1]);
        }
    }
    return arrReturn;
}
exports.split = split;
function randomStr(str = '', start = '[', end = ']', separator = '|') {
    var _a, _b, _c, _d;
    if (!str) {
        return '';
    }
    const arrReturn = [];
    const arr = split === null || split === void 0 ? void 0 : split(str, start, end);
    for (let strOne of arr) {
        if ((_a = _ === null || _ === void 0 ? void 0 : _.startsWith) === null || _a === void 0 ? void 0 : _a.call(_, strOne, 'ARR:')) {
            strOne = random((_b = _ === null || _ === void 0 ? void 0 : _.replace) === null || _b === void 0 ? void 0 : _b.call(_, strOne, 'ARR:', ''), separator);
        }
        (_c = arrReturn.push) === null || _c === void 0 ? void 0 : _c.call(arrReturn, strOne);
    }
    return (_d = _ === null || _ === void 0 ? void 0 : _.join) === null || _d === void 0 ? void 0 : _d.call(_, arrReturn, '');
}
exports.randomStr = randomStr;
function uuid() {
    var _a, _b, _c;
    return ((_b = (_a = moment()).format) === null || _b === void 0 ? void 0 : _b.call(_a, 'YYYYMMDDHHmmss')) + ((_c = _ === null || _ === void 0 ? void 0 : _.random) === null || _c === void 0 ? void 0 : _c.call(_, 1000000000, 9999999999, false));
}
exports.uuid = uuid;
function antParams2Arr(params, exclude = []) {
    /**
     *
     * 将pro.ant.design表格筛选栏提交的对象形式的数据，转化成数组
     *
     * 例: params: '{ current: 1, pageSize: 20, trueName: 'abc' }', exclude: ['current', 'pageSize',]
     *
     * 返回值: [ { label: 'trueName', value: 'abc', }, ]
     *
     */
    var _a, _b, _c, _d, _e;
    if (!params) {
        return null;
    }
    const arr = [];
    for (const key in params) {
        if ((_c = (_b = (_a = Object === null || Object === void 0 ? void 0 : Object.prototype) === null || _a === void 0 ? void 0 : _a.hasOwnProperty) === null || _b === void 0 ? void 0 : _b.call) === null || _c === void 0 ? void 0 : _c.call(_b, params, key)) {
            const val = params === null || params === void 0 ? void 0 : params[key];
            if ((_d = exclude === null || exclude === void 0 ? void 0 : exclude.includes) === null || _d === void 0 ? void 0 : _d.call(exclude, key)) {
                continue;
            }
            (_e = arr === null || arr === void 0 ? void 0 : arr.push) === null || _e === void 0 ? void 0 : _e.call(arr, { label: key, value: val });
        }
    }
    return arr;
}
exports.antParams2Arr = antParams2Arr;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyVXRpbHMuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZS9jb21tb24vdXRpbHMvc3RyVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNEJBQTZCO0FBRTdCLGlDQUFrQztBQUVsQyxNQUFNLElBQUksR0FBUSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFbEMsU0FBZ0IsTUFBTSxDQUFDLEdBQVc7O0lBQ2hDLE9BQU8sQ0FBQSxNQUFBLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxVQUFVLGtEQUFHLEdBQUcsRUFBRSxTQUFTLENBQUMsTUFBSSxNQUFBLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxVQUFVLGtEQUFHLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQSxDQUFDO0FBQzdFLENBQUM7QUFGRCx3QkFFQztBQUVELFNBQWdCLGNBQWMsQ0FBQyxRQUFnQjs7SUFDN0MsSUFBSSxDQUFDLFFBQVEsRUFBRTtRQUNiLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFFRCxRQUFRLEdBQUcsTUFBQSxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxrREFBRyxRQUFRLENBQUMsQ0FBQztJQUUvQixRQUFRLEdBQUcsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsU0FBUyxxREFBRyxRQUFRLENBQUMsQ0FBQztJQUV2QyxRQUFRLEdBQUcsTUFBQSxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsT0FBTyxrREFBRyxRQUFRLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRTlDLElBQUksTUFBQSxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsVUFBVSxrREFBRyxRQUFRLEVBQUUsR0FBRyxDQUFDLEVBQUU7UUFDbEMsUUFBUSxHQUFHLE1BQUEsUUFBUSxhQUFSLFFBQVEs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