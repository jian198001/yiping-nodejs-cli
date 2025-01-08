"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
/**
 * 结果模型类，用于封装API返回的数据
 */
class Result {
    constructor() {
        /**
         * 响应状态码，默认为0
         */
        this.code = 0;
        /**
         * 响应消息，默认为空字符串
         */
        this.message = '';
        /**
         * 响应数据，默认为null
         */
        this.data = null;
        /**
         * 响应消息，默认为空字符串
         */
        this.msg = '';
    }
}
exports.Result = Result;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzdWx0LmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2R1bGUvY29tbW9uL21vZGVsL1Jlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQTs7R0FFRztBQUNILE1BQWEsTUFBTTtJQUFuQjtRQUNFOztXQUVHO1FBQ0ksU0FBSSxHQUFHLENBQUMsQ0FBQztRQUVoQjs7V0FFRztRQUNJLFlBQU8sR0FBRyxFQUFFLENBQUM7UUFFcEI7O1dBRUc7UUFDSSxTQUFJLEdBQVEsSUFBSSxDQUFDO1FBRXhCOztXQUVHO1FBQ0ksUUFBRyxHQUFHLEVBQUUsQ0FBQztJQUNsQixDQUFDO0NBQUE7QUFwQkQsd0JBb0JDIn0=