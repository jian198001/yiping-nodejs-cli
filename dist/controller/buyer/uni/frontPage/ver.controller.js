"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyerUniFrontPageVerController = void 0;
const decorator_1 = require("@midwayjs/decorator");
/**
 * 买家前端页面版本控制器
 */
let BuyerUniFrontPageVerController = class BuyerUniFrontPageVerController {
    /**
     * 获取版本信息
     *
     * @returns 返回版本信息
     */
    async ver() {
        // 返回版本信息
        return {
            ver: '0.0.1',
            title: '第一版程序',
            content: '程序第一版',
            apk: '',
            ios: '',
            isForceUpdate: '0',
            appVersionCode: '0', // 应用版本代码
        };
    }
};
__decorate([
    (0, decorator_1.All)('/ver.json'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPageVerController.prototype, "ver", null);
BuyerUniFrontPageVerController = __decorate([
    (0, decorator_1.Controller)('/buyer/uni/frontPage/ver')
], BuyerUniFrontPageVerController);
exports.BuyerUniFrontPageVerController = BuyerUniFrontPageVerController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmVyLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIvYnV5ZXIvdW5pL2Zyb250UGFnZS92ZXIuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxtREFBc0Q7QUFFdEQ7O0dBRUc7QUFFSCxJQUFhLDhCQUE4QixHQUEzQyxNQUFhLDhCQUE4QjtJQUN6Qzs7OztPQUlHO0lBRUksS0FBSyxDQUFDLEdBQUc7UUFDZCxTQUFTO1FBQ1QsT0FBTztZQUNMLEdBQUcsRUFBRSxPQUFPO1lBQ1osS0FBSyxFQUFFLE9BQU87WUFDZCxPQUFPLEVBQUUsT0FBTztZQUNoQixHQUFHLEVBQUUsRUFBRTtZQUNQLEdBQUcsRUFBRSxFQUFFO1lBQ1AsYUFBYSxFQUFFLEdBQUc7WUFDbEIsY0FBYyxFQUFFLEdBQUcsRUFBRSxTQUFTO1NBQy9CLENBQUM7SUFDSixDQUFDO0NBQ0YsQ0FBQTtBQVpDO0lBREMsSUFBQSxlQUFHLEVBQUMsV0FBVyxDQUFDOzs7O3lEQVloQjtBQWxCVSw4QkFBOEI7SUFEMUMsSUFBQSxzQkFBVSxFQUFDLDBCQUEwQixDQUFDO0dBQzFCLDhCQUE4QixDQW1CMUM7QUFuQlksd0VBQThCIn0=