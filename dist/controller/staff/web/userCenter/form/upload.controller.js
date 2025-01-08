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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffWebUserCenterUploadController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const fileUtils = require("../../../../../module/common/utils/fileUtils");
/**
 * 员工Web用户中心上传控制器
 * 处理文件上传请求
 */
let StaffWebUserCenterUploadController = class StaffWebUserCenterUploadController {
    constructor() {
        // 注入Logger实例
        this.logger = null;
        // 注入Application实例
        this.app = null;
    }
    /**
     * 处理文件上传请求
     * @param files - 上传的文件数组
     * @param query - 查询参数
     * @returns 返回上传文件的路径
     */
    async upload(files, query) {
        var _a, _b, _c;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, '文件上传');
        // 打印上传的文件信息
        console.log(files);
        // 复制上传的文件到指定目录，并返回文件路径
        const data = '/' + (fileUtils === null || fileUtils === void 0 ? void 0 : fileUtils.copySync(files === null || files === void 0 ? void 0 : files[0], 'upload', (_c = this === null || this === void 0 ? void 0 : this.app) === null || _c === void 0 ? void 0 : _c.getAppDir()));
        return data;
    }
};
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], StaffWebUserCenterUploadController.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.App)(),
    __metadata("design:type", Object)
], StaffWebUserCenterUploadController.prototype, "app", void 0);
__decorate([
    (0, decorator_1.All)('/upload.json'),
    __param(0, (0, decorator_1.Files)()),
    __param(1, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StaffWebUserCenterUploadController.prototype, "upload", null);
StaffWebUserCenterUploadController = __decorate([
    (0, decorator_1.Controller)('/staff/web/userCenter/upload')
], StaffWebUserCenterUploadController);
exports.StaffWebUserCenterUploadController = StaffWebUserCenterUploadController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImNvbnRyb2xsZXIvc3RhZmYvd2ViL3VzZXJDZW50ZXIvZm9ybS91cGxvYWQuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFPNkI7QUFJN0IsMEVBQTBFO0FBRTFFOzs7R0FHRztBQUVILElBQWEsa0NBQWtDLEdBQS9DLE1BQWEsa0NBQWtDO0lBQS9DO1FBQ0UsYUFBYTtRQUVMLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFDL0Isa0JBQWtCO1FBRVYsUUFBRyxHQUFnQixJQUFJLENBQUM7SUFxQmxDLENBQUM7SUFwQkM7Ozs7O09BS0c7SUFFSSxLQUFLLENBQUMsTUFBTSxDQUFVLEtBQUssRUFBVyxLQUFLOztRQUNoRCxPQUFPO1FBQ1AsTUFBQSxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxNQUFNLDBDQUFFLElBQUksbURBQUcsTUFBTSxDQUFDLENBQUM7UUFFN0IsWUFBWTtRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFbkIsdUJBQXVCO1FBQ3ZCLE1BQU0sSUFBSSxHQUNSLEdBQUcsSUFBRyxTQUFTLGFBQVQsU0FBUyx1QkFBVCxTQUFTLENBQUUsUUFBUSxDQUFDLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRyxDQUFDLENBQUMsRUFBRSxRQUFRLEVBQUUsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsR0FBRywwQ0FBRSxTQUFTLEVBQUUsQ0FBQyxDQUFBLENBQUM7UUFFMUUsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0YsQ0FBQTtBQXhCQztJQURDLElBQUEsa0JBQU0sR0FBRTs7a0VBQ3NCO0FBRy9CO0lBREMsSUFBQSxlQUFHLEdBQUU7OytEQUMwQjtBQVFoQztJQURDLElBQUEsZUFBRyxFQUFDLGNBQWMsQ0FBQztJQUNDLFdBQUEsSUFBQSxpQkFBSyxHQUFFLENBQUE7SUFBUyxXQUFBLElBQUEsaUJBQUssR0FBRSxDQUFBOzs7O2dFQVkzQztBQTFCVSxrQ0FBa0M7SUFEOUMsSUFBQSxzQkFBVSxFQUFDLDhCQUE4QixDQUFDO0dBQzlCLGtDQUFrQyxDQTJCOUM7QUEzQlksZ0ZBQWtDIn0=