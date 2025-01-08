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
exports.BuyerUniFrontPagePdf2docxController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const pdf_service_1 = require("../../../../../../module/file/pdf.service");
const fileUtils = require("../../../../../../module/common/utils/fileUtils");
const path = require("path");
/**
 * 买家前端页面PDF转DOCX控制器
 */
let BuyerUniFrontPagePdf2docxController = class BuyerUniFrontPagePdf2docxController {
    constructor() {
        /**
         * 注入PDF服务
         */
        this.pdfService = null;
        /**
         * 注入应用程序实例
         */
        this.app = null;
    }
    /**
     * 上传PDF文件并转换为DOCX
     *
     * @param files - 上传的文件
     * @param query - 查询参数
     * @returns 返回转换后的DOCX文件路径
     */
    async upload(files, query) {
        var _a;
        // 复制上传的PDF文件到指定目录
        const filePath = fileUtils.copySync(files === null || files === void 0 ? void 0 : files[0], 'upload', this === null || this === void 0 ? void 0 : this.app.getAppDir());
        // 获取上传文件的完整路径
        const p = (_a = path === null || path === void 0 ? void 0 : path.join) === null || _a === void 0 ? void 0 : _a.call(path, this === null || this === void 0 ? void 0 : this.app.getAppDir(), filePath);
        // 调用PDF服务的PDF转DOCX方法
        return await (this === null || this === void 0 ? void 0 : this.pdfService.pdf2docx(p, this === null || this === void 0 ? void 0 : this.app.getAppDir()));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", pdf_service_1.PdfService)
], BuyerUniFrontPagePdf2docxController.prototype, "pdfService", void 0);
__decorate([
    (0, decorator_1.App)(),
    __metadata("design:type", Object)
], BuyerUniFrontPagePdf2docxController.prototype, "app", void 0);
__decorate([
    (0, decorator_1.All)('/upload.json'),
    __param(0, (0, decorator_1.Files)()),
    __param(1, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPagePdf2docxController.prototype, "upload", null);
BuyerUniFrontPagePdf2docxController = __decorate([
    (0, decorator_1.Controller)('/buyer/uni/frontPage/pdf2docx')
], BuyerUniFrontPagePdf2docxController);
exports.BuyerUniFrontPagePdf2docxController = BuyerUniFrontPagePdf2docxController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmMmRvY3guY29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiY29udHJvbGxlci9idXllci91bmkvZnJvbnRQYWdlL3Rvb2wvZmlsZS9wZGYyZG9jeC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLG1EQU82QjtBQUM3QiwyRUFBdUU7QUFFdkUsNkVBQTZFO0FBQzdFLDZCQUE4QjtBQUU5Qjs7R0FFRztBQUVILElBQWEsbUNBQW1DLEdBQWhELE1BQWEsbUNBQW1DO0lBQWhEO1FBQ0U7O1dBRUc7UUFFSyxlQUFVLEdBQWUsSUFBSSxDQUFDO1FBQ3RDOztXQUVHO1FBRUssUUFBRyxHQUFnQixJQUFJLENBQUM7SUFxQmxDLENBQUM7SUFwQkM7Ozs7OztPQU1HO0lBRUksS0FBSyxDQUFDLE1BQU0sQ0FBVSxLQUFLLEVBQVcsS0FBSzs7UUFDaEQsa0JBQWtCO1FBQ2xCLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQ2pDLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRyxDQUFDLENBQUMsRUFDVixRQUFRLEVBQ1IsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLEdBQUcsQ0FBQyxTQUFTLEVBQUUsQ0FDdEIsQ0FBQztRQUNGLGNBQWM7UUFDZCxNQUFNLENBQUMsR0FBRyxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxJQUFJLHFEQUFHLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxHQUFHLENBQUMsU0FBUyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDeEQscUJBQXFCO1FBQ3JCLE9BQU8sTUFBTSxDQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUEsQ0FBQztJQUNuRSxDQUFDO0NBQ0YsQ0FBQTtBQTFCQztJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDVyx3QkFBVTt1RUFBUTtBQUt0QztJQURDLElBQUEsZUFBRyxHQUFFOztnRUFDMEI7QUFTaEM7SUFEQyxJQUFBLGVBQUcsRUFBQyxjQUFjLENBQUM7SUFDQyxXQUFBLElBQUEsaUJBQUssR0FBRSxDQUFBO0lBQVMsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTs7OztpRUFXM0M7QUE5QlUsbUNBQW1DO0lBRC9DLElBQUEsc0JBQVUsRUFBQywrQkFBK0IsQ0FBQztHQUMvQixtQ0FBbUMsQ0ErQi9DO0FBL0JZLGtGQUFtQyJ9