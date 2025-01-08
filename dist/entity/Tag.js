"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tag = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 标签实体类
 * 继承自BaseModel，用于存储标签的相关信息
 */
let Tag = class Tag extends BaseModel_1.BaseModel {
};
Tag = __decorate([
    (0, typeorm_1.Entity)()
], Tag);
exports.Tag = Tag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFnLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvVGFnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHFDQUErQjtBQUMvQixnRUFBNEQ7QUFFNUQ7OztHQUdHO0FBRUgsSUFBYSxHQUFHLEdBQWhCLE1BQWEsR0FBSSxTQUFRLHFCQUFTO0NBR2pDLENBQUE7QUFIWSxHQUFHO0lBRGYsSUFBQSxnQkFBTSxHQUFFO0dBQ0ksR0FBRyxDQUdmO0FBSFksa0JBQUcifQ==