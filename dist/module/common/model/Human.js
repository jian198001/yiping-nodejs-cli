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
exports.Human = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("./BaseModel");
/**
 * 人类模型类，继承自基础模型类
 */
class Human extends BaseModel_1.BaseModel {
}
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '性别。1表示男性,2表示女性' }),
    __metadata("design:type", String)
], Human.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '出生日期', name: 'birth_date', }),
    __metadata("design:type", Date)
], Human.prototype, "birthDate", void 0);
exports.Human = Human;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHVtYW4uanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbIm1vZHVsZS9jb21tb24vbW9kZWwvSHVtYW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQWlDO0FBQ2pDLDJDQUF3QztBQUV4Qzs7R0FFRztBQUNILE1BQWEsS0FBTSxTQUFRLHFCQUFTO0NBWW5DO0FBUEM7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxDQUFDOztxQ0FDaEM7QUFNdEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFlBQVksR0FBRyxDQUFDOzhCQUMvQyxJQUFJO3dDQUFDO0FBWHpCLHNCQVlDIn0=