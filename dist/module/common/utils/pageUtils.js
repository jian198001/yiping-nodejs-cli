"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultSort = void 0;
const _ = require("lodash");
/**
 * 处理默认排序参数
 *
 * @param {any} reqParam - 请求参数对象
 * @returns {any} 返回处理后的请求参数对象
 */
function defaultSort(reqParam) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    // 如果请求参数为空，则返回空对象
    if (!reqParam) {
        return {};
    }
    // 去除排序字段的前后空格
    let sortName = (_a = _ === null || _ === void 0 ? void 0 : _.trim) === null || _a === void 0 ? void 0 : _a.call(_, reqParam === null || reqParam === void 0 ? void 0 : reqParam.sortName);
    // 去除排序顺序的前后空格
    let sortOrder = (_b = _ === null || _ === void 0 ? void 0 : _.trim) === null || _b === void 0 ? void 0 : _b.call(_, reqParam === null || reqParam === void 0 ? void 0 : reqParam.sortOrder);
    // 如果排序字段中包含空格
    if (sortName.indexOf(' ') > -1) {
        // 处理uni-app的排序字段
        const sortNameTmp = (_c = _ === null || _ === void 0 ? void 0 : _.split) === null || _c === void 0 ? void 0 : _c.call(_, sortName, ' ');
        // 如果排序顺序为空，则使用排序字段中的第二个部分作为排序顺序
        if (!sortOrder) {
            sortOrder = _ === null || _ === void 0 ? void 0 : _.toUpper(sortNameTmp[1]);
        }
        // 使用排序字段中的第一个部分作为排序字段
        sortName = (_d = _ === null || _ === void 0 ? void 0 : _.head) === null || _d === void 0 ? void 0 : _d.call(_, sortNameTmp);
    }
    // 如果排序字段中不包含空格
    if (sortName.indexOf(' ') < 0) {
        // 将排序字段转换为蛇形命名法
        sortName = (_e = _ === null || _ === void 0 ? void 0 : _.snakeCase) === null || _e === void 0 ? void 0 : _e.call(_, sortName);
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
    if ((_ === null || _ === void 0 ? void 0 : _.toUpper(sortName).indexOf(' ASC')) > -1) {
        // 去除排序字段中的'ASC'
        sortName = (_f = _ === null || _ === void 0 ? void 0 : _.replace) === null || _f === void 0 ? void 0 : _f.call(_, sortName, ' ASC', '');
        // 去除排序字段中的'asc'
        sortName = (_g = _ === null || _ === void 0 ? void 0 : _.replace) === null || _g === void 0 ? void 0 : _g.call(_, sortName, ' asc', '');
        // 设置排序顺序为'ASC'
        sortOrder = ' ASC ';
    }
    // 如果排序字段中包含'DESC'
    if ((_ === null || _ === void 0 ? void 0 : _.toUpper(sortName).indexOf(' DESC')) > -1) {
        // 去除排序字段中的'DESC'
        sortName = (_h = _ === null || _ === void 0 ? void 0 : _.replace) === null || _h === void 0 ? void 0 : _h.call(_, sortName, ' DESC', '');
        sortName = (_j = _ === null || _ === void 0 ? void 0 : _.replace) === null || _j === void 0 ? void 0 : _j.call(_, sortName, ' desc', '');
        sortOrder = ' DESC ';
    }
    reqParam.sortName = sortName;
    reqParam.sortOrder = _ === null || _ === void 0 ? void 0 : _.toUpper(sortOrder);
    return reqParam;
}
exports.defaultSort = defaultSort;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZVV0aWxzLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2R1bGUvY29tbW9uL3V0aWxzL3BhZ2VVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0QkFBNkI7QUFFN0I7Ozs7O0dBS0c7QUFDSCxTQUFnQixXQUFXLENBQUMsUUFBYTs7SUFDdkMsa0JBQWtCO0lBQ2xCLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixPQUFPLEVBQUUsQ0FBQztLQUNYO0lBRUQsY0FBYztJQUNkLElBQUksUUFBUSxHQUFXLE1BQUEsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLElBQUksa0RBQUcsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLFFBQVEsQ0FBQyxDQUFDO0lBRXJELGNBQWM7SUFDZCxJQUFJLFNBQVMsR0FBVyxNQUFBLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLGtEQUFHLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxTQUFTLENBQUMsQ0FBQztJQUV2RCxjQUFjO0lBQ2QsSUFBSSxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1FBQzlCLGlCQUFpQjtRQUNqQixNQUFNLFdBQVcsR0FBYSxNQUFBLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxLQUFLLGtEQUFHLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUV4RCxnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNkLFNBQVMsR0FBRyxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hDO1FBRUQsc0JBQXNCO1FBQ3RCLFFBQVEsR0FBRyxNQUFBLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLGtEQUFHLFdBQVcsQ0FBQyxDQUFDO0tBQ25DO0lBRUQsZUFBZTtJQUNmLElBQUksUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDN0IsZ0JBQWdCO1FBQ2hCLFFBQVEsR0FBRyxNQUFBLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxTQUFTLGtEQUFHLFFBQVEsQ0FBQyxDQUFDO0tBQ3JDO0lBRUQsNkJBQTZCO0lBQzdCLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixRQUFRLEdBQUcsYUFBYSxDQUFDO0tBQzFCO0lBRUQsd0JBQXdCO0lBQ3hCLElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDZCxTQUFTLEdBQUcsUUFBUSxDQUFDO0tBQ3RCO0lBRUQsaUJBQWlCO0lBQ2pCLElBQUksQ0FBQSxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUcsQ0FBQyxDQUFDLEVBQUU7UUFDN0MsZ0JBQWdCO1FBQ2hCLFFBQVEsR0FBRyxNQUFBLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxPQUFPLGtEQUFHLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFOUMsZ0JBQWdCO1FBQ2hCLFFBQVEsR0FBRyxNQUFBLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxPQUFPLGtEQUFHLFFBQVEsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFOUMsZUFBZTtRQUNmLFNBQVMsR0FBRyxPQUFPLENBQUM7S0FDckI7SUFFRCxrQkFBa0I7SUFDbEIsSUFBSSxDQUFBLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxPQUFPLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBRyxDQUFDLENBQUMsRUFBRTtRQUM5QyxpQkFBaUI7UUFDakIsUUFBUSxHQUFHLE1BQUEsQ0FBQyxhQUFELENBQUMsdUJBQUQsQ0FBQyxDQUFFLE9BQU8sa0RBQUcsUUFBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUUvQyxRQUFRLEdBQUcsTUFBQSxDQUFDLGFBQUQsQ0FBQyx1QkFBRCxDQUFDLENBQUUsT0FBTyxrREFBRyxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRS9DLFNBQVMsR0FBRyxRQUFRLENBQUM7S0FDdEI7SUFFRCxRQUFRLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUU3QixRQUFRLENBQUMsU0FBUyxHQUFHLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFM0MsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQXJFRCxrQ0FxRUMifQ==