"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snakeCase = exports.camelCase = void 0;
const _ = require("lodash");
function camelCase(obj) {
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
    const keys = _ === null || _ === void 0 ? void 0 : _.keys(obj);
    keys.forEach(item => {
        var _a;
        const camelCase = (_a = _ === null || _ === void 0 ? void 0 : _.camelCase) === null || _a === void 0 ? void 0 : _a.call(_, item);
        obj[camelCase] = obj === null || obj === void 0 ? void 0 : obj[item];
    });
    return obj;
}
exports.camelCase = camelCase;
function snakeCase(obj) {
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
    let _obj = _ === null || _ === void 0 ? void 0 : _.cloneDeep(obj);
    const keys = _ === null || _ === void 0 ? void 0 : _.keys(_obj);
    keys.forEach(item => {
        var _a;
        const snakeCase = (_a = _ === null || _ === void 0 ? void 0 : _.snakeCase) === null || _a === void 0 ? void 0 : _a.call(_, item);
        _obj[snakeCase] = _obj === null || _obj === void 0 ? void 0 : _obj[item];
        if (item !== snakeCase) {
            _obj = _ === null || _ === void 0 ? void 0 : _.omit(_obj, [item]);
        }
    });
    return _obj;
}
exports.snakeCase = snakeCase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqVXRpbHMuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZS9jb21tb24vdXRpbHMvb2JqVXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNEJBQTZCO0FBRTdCLFNBQWdCLFNBQVMsQ0FBQyxHQUFRO0lBQ2hDOzs7Ozs7Ozs7T0FTRztJQUVILE1BQU0sSUFBSSxHQUFRLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFFOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTs7UUFDbEIsTUFBTSxTQUFTLEdBQUcsTUFBQSxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsU0FBUyxrREFBRyxJQUFJLENBQUMsQ0FBQTtRQUV0QyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFHLElBQUksQ0FBQyxDQUFBO0lBQzlCLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBckJELDhCQXFCQztBQUVELFNBQWdCLFNBQVMsQ0FBQyxHQUFRO0lBQ2hDOzs7Ozs7Ozs7T0FTRztJQUVILElBQUksSUFBSSxHQUFRLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUE7SUFFakMsTUFBTSxJQUFJLEdBQVEsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUUvQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFOztRQUNsQixNQUFNLFNBQVMsR0FBUSxNQUFBLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxTQUFTLGtEQUFHLElBQUksQ0FBQyxDQUFBO1FBRTNDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUcsSUFBSSxDQUFDLENBQUE7UUFFOUIsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO1lBQ3RCLElBQUksR0FBRyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7U0FDN0I7SUFDSCxDQUFDLENBQUMsQ0FBQTtJQUVGLE9BQU8sSUFBSSxDQUFBO0FBQ2IsQ0FBQztBQTNCRCw4QkEyQkMifQ==