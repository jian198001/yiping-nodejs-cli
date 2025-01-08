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
exports.GoogleCredentials = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
const swagger_1 = require("@midwayjs/swagger");
/**
 * Google凭证实体类
 * 用于表示Google凭证的基本信息
 */
let GoogleCredentials = class GoogleCredentials extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'account_name', }),
    (0, swagger_1.ApiProperty)({ description: '账户名称', }),
    __metadata("design:type", String)
], GoogleCredentials.prototype, "accountName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'display_name', }),
    (0, swagger_1.ApiProperty)({ description: '显示名称', }),
    __metadata("design:type", String)
], GoogleCredentials.prototype, "displayName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'email', }),
    (0, swagger_1.ApiProperty)({ description: '邮箱', }),
    __metadata("design:type", String)
], GoogleCredentials.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'family_name', }),
    (0, swagger_1.ApiProperty)({ description: '姓氏', }),
    __metadata("design:type", String)
], GoogleCredentials.prototype, "familyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'given_name', }),
    (0, swagger_1.ApiProperty)({ description: '名字', }),
    __metadata("design:type", String)
], GoogleCredentials.prototype, "givenName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'google_id', }),
    (0, swagger_1.ApiProperty)({ description: 'Google ID', }),
    __metadata("design:type", String)
], GoogleCredentials.prototype, "googleId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'photo_url', }),
    (0, swagger_1.ApiProperty)({ description: '照片URL', }),
    __metadata("design:type", String)
], GoogleCredentials.prototype, "photoUrl", void 0);
GoogleCredentials = __decorate([
    (0, typeorm_1.Entity)()
], GoogleCredentials);
exports.GoogleCredentials = GoogleCredentials;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR29vZ2xlQ3JlZGVudGlhbHMuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9Hb29nbGVDcmVkZW50aWFscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBdUM7QUFDdkMsZ0VBQTREO0FBQzVELCtDQUFnRDtBQUVoRDs7O0dBR0c7QUFFSCxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFrQixTQUFRLHFCQUFTO0NBMEQvQyxDQUFBO0FBbERDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLEdBQUUsQ0FBQztJQUM1RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsTUFBTSxHQUFFLENBQUM7O3NEQUNWO0FBUTFCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLEdBQUUsQ0FBQztJQUM1RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsTUFBTSxHQUFFLENBQUM7O3NEQUNWO0FBUTFCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEdBQUUsQ0FBQztJQUNyRCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsSUFBSSxHQUFFLENBQUM7O2dEQUNkO0FBUXBCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEdBQUUsQ0FBQztJQUMzRCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsSUFBSSxHQUFFLENBQUM7O3FEQUNUO0FBUXpCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxZQUFZLEdBQUUsQ0FBQztJQUMxRCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsSUFBSSxHQUFFLENBQUM7O29EQUNWO0FBUXhCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEdBQUUsQ0FBQztJQUN6RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsV0FBVyxHQUFFLENBQUM7O21EQUNsQjtBQVF2QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxHQUFFLENBQUM7SUFDekQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLE9BQU8sR0FBRSxDQUFDOzttREFDZDtBQXhEWixpQkFBaUI7SUFEN0IsSUFBQSxnQkFBTSxHQUFFO0dBQ0ksaUJBQWlCLENBMEQ3QjtBQTFEWSw4Q0FBaUIifQ==