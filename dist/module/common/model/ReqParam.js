"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReqParam = void 0;
/**
 * 请求参数模型类
 */
class ReqParam {
    constructor() {
        /**
         * 过滤条件，默认为空字符串
         */
        this.filters = '';
        /**
         * 搜索值，默认为空字符串
         */
        this.searchValue = '';
        /**
         * 排序字段，默认为'order_num'
         */
        this.sortName = ' order_num ';
        /**
         * 排序顺序，默认为'ASC'
         */
        this.sortOrder = ' ASC ';
        /**
         * 标签值，默认为空字符串
         */
        this.tabVal = '';
        /**
         * 令牌，默认为空字符串
         */
        this.token = '';
    }
}
exports.ReqParam = ReqParam;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVxUGFyYW0uanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZS9jb21tb24vbW9kZWwvUmVxUGFyYW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7O0dBRUc7QUFDSCxNQUFhLFFBQVE7SUFBckI7UUFDRTs7V0FFRztRQUNJLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFFcEI7O1dBRUc7UUFDSSxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUV4Qjs7V0FFRztRQUNJLGFBQVEsR0FBRyxhQUFhLENBQUM7UUFFaEM7O1dBRUc7UUFDSSxjQUFTLEdBQUcsT0FBTyxDQUFDO1FBRTNCOztXQUVHO1FBQ0ksV0FBTSxHQUFHLEVBQUUsQ0FBQztRQUVuQjs7V0FFRztRQUNJLFVBQUssR0FBRyxFQUFFLENBQUM7SUFDcEIsQ0FBQztDQUFBO0FBOUJELDRCQThCQyJ9