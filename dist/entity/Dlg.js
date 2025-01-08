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
exports.Dlg = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 对话框实体类
 *
 * 该类用于定义对话框的基本信息，包括路径和表单ID。
 * 所有标识符名称均来自支付宝。
 */
let Dlg = class Dlg extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', }),
    __metadata("design:type", String)
], Dlg.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: 'form_id', name: 'form_id', }),
    __metadata("design:type", String)
], Dlg.prototype, "formId", void 0);
Dlg = __decorate([
    (0, typeorm_1.Entity)()
], Dlg);
exports.Dlg = Dlg;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGxnLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvRGxnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF1QztBQUN2QyxnRUFBNEQ7QUFFNUQ7Ozs7O0dBS0c7QUFFSCxJQUFhLEdBQUcsR0FBaEIsTUFBYSxHQUFJLFNBQVEscUJBQVM7Q0FrQmpDLENBQUE7QUFWQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsR0FBRSxDQUFDOztpQ0FDcEI7QUFRbkI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRSxDQUFDOzttQ0FDMUM7QUFoQlYsR0FBRztJQURmLElBQUEsZ0JBQU0sR0FBRTtHQUNJLEdBQUcsQ0FrQmY7QUFsQlksa0JBQUcifQ==