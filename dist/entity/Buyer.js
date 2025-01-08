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
exports.Buyer = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const User_1 = require("../module/common/model/User");
/**
 * 买家实体类
 * 继承自User，包含买家相关的各种信息
 */
let Buyer = class Buyer extends User_1.User {
    constructor() {
        super(...arguments);
        /**
         * 出生日期
         * 对应买家的出生日期
         */
        this.birthDate = null;
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'birth_date', type: 'datetime', }),
    __metadata("design:type", Object)
], Buyer.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'gender', }),
    __metadata("design:type", String)
], Buyer.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'nickname', }),
    (0, swagger_1.ApiProperty)({ description: '昵称', }),
    __metadata("design:type", String)
], Buyer.prototype, "nickname", void 0);
Buyer = __decorate([
    (0, typeorm_1.Entity)()
], Buyer);
exports.Buyer = Buyer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV5ZXIuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9CdXllci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBOEM7QUFDOUMscUNBQXVDO0FBQ3ZDLHNEQUFtRDtBQUVuRDs7O0dBR0c7QUFFSCxJQUFhLEtBQUssR0FBbEIsTUFBYSxLQUFNLFNBQVEsV0FBSTtJQUEvQjs7UUFFRTs7O1dBR0c7UUFFSSxjQUFTLEdBQVEsSUFBSSxDQUFDO0lBaUIvQixDQUFDO0NBQUEsQ0FBQTtBQWpCQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLElBQUksRUFBRSxVQUFVLEdBQUUsQ0FBQzs7d0NBQ2hEO0FBTzdCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxRQUFRLEdBQUUsQ0FBQzs7cUNBQ2xDO0FBUXJCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEdBQUUsQ0FBQztJQUN4RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsSUFBSSxHQUFFLENBQUM7O3VDQUNYO0FBdEJaLEtBQUs7SUFEakIsSUFBQSxnQkFBTSxHQUFFO0dBQ0ksS0FBSyxDQXdCakI7QUF4Qlksc0JBQUsifQ==