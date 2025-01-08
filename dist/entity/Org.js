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
exports.Org = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 组织实体类
 * 用于表示组织的基本信息
 */
let Org = class Org extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'parent_id' }),
    __metadata("design:type", String)
], Org.prototype, "parentId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '' }),
    __metadata("design:type", String)
], Org.prototype, "code", void 0);
Org = __decorate([
    (0, typeorm_1.Entity)()
], Org);
exports.Org = Org;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JnLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvT3JnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFDQUF5QztBQUN6QyxnRUFBNkQ7QUFFN0Q7OztHQUdHO0FBRUgsSUFBYSxHQUFHLEdBQWhCLE1BQWEsR0FBSSxTQUFRLHFCQUFTO0NBY2pDLENBQUE7QUFSQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLENBQUM7O3FDQUNuQztBQU94QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDOztpQ0FDcEI7QUFiVCxHQUFHO0lBRGYsSUFBQSxnQkFBTSxHQUFFO0dBQ0ksR0FBRyxDQWNmO0FBZFksa0JBQUcifQ==