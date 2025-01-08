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
exports.Article = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 文章实体类
 * 继承自BaseModel，包含文章相关的各种信息
 */
let Article = class Article extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '标题', }),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '栏目id', name: 'category_id', }),
    __metadata("design:type", String)
], Article.prototype, "categoryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '内容', }),
    __metadata("design:type", String)
], Article.prototype, "content", void 0);
Article = __decorate([
    (0, typeorm_1.Entity)()
], Article);
exports.Article = Article;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJ0aWNsZS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L0FydGljbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXVDO0FBQ3ZDLGdFQUE0RDtBQUU1RDs7O0dBR0c7QUFFSCxJQUFhLE9BQU8sR0FBcEIsTUFBYSxPQUFRLFNBQVEscUJBQVM7Q0F1QnJDLENBQUE7QUFoQkM7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEdBQUUsQ0FBQzs7c0NBQ3JCO0FBT3BCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxhQUFhLEdBQUUsQ0FBQzs7MkNBQ3ZDO0FBT3pCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxHQUFFLENBQUM7O3dDQUNuQjtBQXJCWCxPQUFPO0lBRG5CLElBQUEsZ0JBQU0sR0FBRTtHQUNJLE9BQU8sQ0F1Qm5CO0FBdkJZLDBCQUFPIn0=