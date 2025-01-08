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
exports.BuyerUniFrontPagePdf2picController = void 0;
const decorator_1 = require("@midwayjs/decorator");
const pdf_service_1 = require("../../../../../../module/file/pdf.service");
const fileUtils = require("../../../../../../module/common/utils/fileUtils");
const path = require("path");
let BuyerUniFrontPagePdf2picController = class BuyerUniFrontPagePdf2picController {
    constructor() {
        this.pdfService = null;
        this.app = null;
    }
    async upload(files, query) {
        var _a;
        const filePath = fileUtils.copySync(files === null || files === void 0 ? void 0 : files[0], 'upload', this === null || this === void 0 ? void 0 : this.app.getAppDir());
        const p = (_a = path === null || path === void 0 ? void 0 : path.join) === null || _a === void 0 ? void 0 : _a.call(path, this === null || this === void 0 ? void 0 : this.app.getAppDir(), filePath);
        return await (this === null || this === void 0 ? void 0 : this.pdfService.imgZip(p, this === null || this === void 0 ? void 0 : this.app.getAppDir()));
    }
};
__decorate([
    (0, decorator_1.Inject)(),
    __metadata("design:type", pdf_service_1.PdfService)
], BuyerUniFrontPagePdf2picController.prototype, "pdfService", void 0);
__decorate([
    (0, decorator_1.App)(),
    __metadata("design:type", Object)
], BuyerUniFrontPagePdf2picController.prototype, "app", void 0);
__decorate([
    (0, decorator_1.All)('/upload.json'),
    __param(0, (0, decorator_1.Files)()),
    __param(1, (0, decorator_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BuyerUniFrontPagePdf2picController.prototype, "upload", null);
BuyerUniFrontPagePdf2picController = __decorate([
    (0, decorator_1.Controller)('/buyer/uni/frontPage/pdf2pic')
], BuyerUniFrontPagePdf2picController);
exports.BuyerUniFrontPagePdf2picController = BuyerUniFrontPagePdf2picController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmMnBpYy5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJjb250cm9sbGVyL2J1eWVyL3VuaS9mcm9udFBhZ2UvdG9vbC9maWxlL3BkZjJwaWMuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFPNkI7QUFDN0IsMkVBQXVFO0FBRXZFLDZFQUE2RTtBQUM3RSw2QkFBOEI7QUFHOUIsSUFBYSxrQ0FBa0MsR0FBL0MsTUFBYSxrQ0FBa0M7SUFBL0M7UUFFVSxlQUFVLEdBQWUsSUFBSSxDQUFDO1FBRzlCLFFBQUcsR0FBZ0IsSUFBSSxDQUFDO0lBZ0JsQyxDQUFDO0lBYlEsS0FBSyxDQUFDLE1BQU0sQ0FBVSxLQUFLLEVBQVcsS0FBSzs7UUFFaEQsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FDakMsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFHLENBQUMsQ0FBQyxFQUNWLFFBQVEsRUFDUixJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUN0QixDQUFDO1FBRUYsTUFBTSxDQUFDLEdBQUcsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsSUFBSSxxREFBRyxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsR0FBRyxDQUFDLFNBQVMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRXhELE9BQVEsTUFBTSxDQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsR0FBRyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUEsQ0FBQztJQUVsRSxDQUFDO0NBQ0YsQ0FBQTtBQW5CQztJQURDLElBQUEsa0JBQU0sR0FBRTs4QkFDVyx3QkFBVTtzRUFBUTtBQUd0QztJQURDLElBQUEsZUFBRyxHQUFFOzsrREFDMEI7QUFHaEM7SUFEQyxJQUFBLGVBQUcsRUFBQyxjQUFjLENBQUM7SUFDQyxXQUFBLElBQUEsaUJBQUssR0FBRSxDQUFBO0lBQVMsV0FBQSxJQUFBLGlCQUFLLEdBQUUsQ0FBQTs7OztnRUFZM0M7QUFwQlUsa0NBQWtDO0lBRDlDLElBQUEsc0JBQVUsRUFBQyw4QkFBOEIsQ0FBQztHQUM5QixrQ0FBa0MsQ0FxQjlDO0FBckJZLGdGQUFrQyJ9