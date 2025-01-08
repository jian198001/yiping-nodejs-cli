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
exports.AlbumPic = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 相册图片实体类
 * 继承自BaseModel，包含相册图片相关的各种信息
 */
let AlbumPic = class AlbumPic extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'album_id', }),
    __metadata("design:type", String)
], AlbumPic.prototype, "albumId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'pic', }),
    __metadata("design:type", String)
], AlbumPic.prototype, "pic", void 0);
AlbumPic = __decorate([
    (0, typeorm_1.Entity)()
], AlbumPic);
exports.AlbumPic = AlbumPic;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWxidW1QaWMuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9BbGJ1bVBpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBdUM7QUFDdkMsZ0VBQTREO0FBRTVEOzs7R0FHRztBQUVILElBQWEsUUFBUSxHQUFyQixNQUFhLFFBQVMsU0FBUSxxQkFBUztDQWdCdEMsQ0FBQTtBQVRDO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEdBQUUsQ0FBQzs7eUNBQ25DO0FBT3RCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxLQUFLLEdBQUUsQ0FBQzs7cUNBQ2xDO0FBZFAsUUFBUTtJQURwQixJQUFBLGdCQUFNLEdBQUU7R0FDSSxRQUFRLENBZ0JwQjtBQWhCWSw0QkFBUSJ9