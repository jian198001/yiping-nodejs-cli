"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Page = void 0;
/**
 * 分页数据模型类
 */
class Page {
    constructor() {
        /**
         * 当前页码，默认为1
         */
        this.pageNum = 1;
        /**
         * 每页显示的记录数，默认为20
         */
        this.pageSize = 20;
        /**
         * 当前页的起始行号，默认为0
         */
        this.startRow = 0;
        /**
         * 总记录数，默认为0
         */
        this.total = 0;
        /**
         * 当前页的数据列表，默认为空数组
         */
        this.list = [];
    }
}
exports.Page = Page;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFnZS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlL2NvbW1vbi9tb2RlbC9QYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBOztHQUVHO0FBQ0gsTUFBYSxJQUFJO0lBQWpCO1FBQ0U7O1dBRUc7UUFDSSxZQUFPLEdBQUcsQ0FBQyxDQUFDO1FBRW5COztXQUVHO1FBQ0ksYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUVyQjs7V0FFRztRQUNJLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFFcEI7O1dBRUc7UUFDSSxVQUFLLEdBQUcsQ0FBQyxDQUFDO1FBRWpCOztXQUVHO1FBQ0ksU0FBSSxHQUFVLEVBQUUsQ0FBQztJQUMxQixDQUFDO0NBQUE7QUF6QkQsb0JBeUJDIn0=