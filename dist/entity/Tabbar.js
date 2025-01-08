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
exports.Tabbar = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 底部导航栏实体类
 * 继承自BaseModel，用于存储底部导航栏的相关信息
 */
let Tabbar = class Tabbar extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', }),
    __metadata("design:type", String)
], Tabbar.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', }),
    __metadata("design:type", String)
], Tabbar.prototype, "icon", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', }),
    __metadata("design:type", String)
], Tabbar.prototype, "url", void 0);
Tabbar = __decorate([
    (0, typeorm_1.Entity)()
], Tabbar);
exports.Tabbar = Tabbar;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFiYmFyLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvVGFiYmFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF1QztBQUN2QyxnRUFBNEQ7QUFFNUQ7OztHQUdHO0FBRUgsSUFBYSxNQUFNLEdBQW5CLE1BQWEsTUFBTyxTQUFRLHFCQUFTO0NBdUJwQyxDQUFBO0FBaEJDO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxHQUFFLENBQUM7O29DQUNwQjtBQU9uQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsR0FBRSxDQUFDOztvQ0FDcEI7QUFPbkI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEdBQUUsQ0FBQzs7bUNBQ3JCO0FBckJQLE1BQU07SUFEbEIsSUFBQSxnQkFBTSxHQUFFO0dBQ0ksTUFBTSxDQXVCbEI7QUF2Qlksd0JBQU0ifQ==