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
exports.MultipartFile = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
const swagger_1 = require("@midwayjs/swagger");
/**
 * 多部分文件实体类
 * 用于表示多部分文件的基本信息
 */
let MultipartFile = class MultipartFile extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'size', type: 'integer', }),
    (0, swagger_1.ApiProperty)({ description: '文件大小', }),
    __metadata("design:type", Number)
], MultipartFile.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'original_filename', }),
    (0, swagger_1.ApiProperty)({ description: '原始文件名', }),
    __metadata("design:type", String)
], MultipartFile.prototype, "originalFilename", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'uri', }),
    (0, swagger_1.ApiProperty)({ description: '文件URI', }),
    __metadata("design:type", String)
], MultipartFile.prototype, "uri", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'ext_id', }),
    (0, swagger_1.ApiProperty)({ description: '外部ID', }),
    __metadata("design:type", String)
], MultipartFile.prototype, "extId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'ext_type', }),
    (0, swagger_1.ApiProperty)({ description: '外部类型', }),
    __metadata("design:type", String)
], MultipartFile.prototype, "extType", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'cover', }),
    (0, swagger_1.ApiProperty)({ description: '封面图片', }),
    __metadata("design:type", String)
], MultipartFile.prototype, "cover", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'content_type', }),
    (0, swagger_1.ApiProperty)({ description: '内容类型', }),
    __metadata("design:type", String)
], MultipartFile.prototype, "contentType", void 0);
MultipartFile = __decorate([
    (0, typeorm_1.Entity)()
], MultipartFile);
exports.MultipartFile = MultipartFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTXVsdGlwYXJ0RmlsZS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L011bHRpcGFydEZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXVDO0FBQ3ZDLGdFQUE0RDtBQUM1RCwrQ0FBZ0Q7QUFFaEQ7OztHQUdHO0FBRUgsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYyxTQUFRLHFCQUFTO0NBMEQzQyxDQUFBO0FBbERDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRSxDQUFDO0lBQ3JFLElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxNQUFNLEdBQUUsQ0FBQzs7MkNBQ2pCO0FBUW5CO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxtQkFBbUIsR0FBRSxDQUFDO0lBQ2pFLElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxPQUFPLEdBQUUsQ0FBQzs7dURBQ047QUFRL0I7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEtBQUssR0FBRSxDQUFDO0lBQ25ELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxPQUFPLEdBQUUsQ0FBQzs7MENBQ25CO0FBUWxCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEdBQUUsQ0FBQztJQUN0RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsTUFBTSxHQUFFLENBQUM7OzRDQUNoQjtBQVFwQjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxHQUFFLENBQUM7SUFDeEQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLE1BQU0sR0FBRSxDQUFDOzs4Q0FDZDtBQVF0QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxHQUFFLENBQUM7SUFDckQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLE1BQU0sR0FBRSxDQUFDOzs0Q0FDaEI7QUFRcEI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGNBQWMsR0FBRSxDQUFDO0lBQzVELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxNQUFNLEdBQUUsQ0FBQzs7a0RBQ1Y7QUF4RGYsYUFBYTtJQUR6QixJQUFBLGdCQUFNLEdBQUU7R0FDSSxhQUFhLENBMER6QjtBQTFEWSxzQ0FBYSJ9