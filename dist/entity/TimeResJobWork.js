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
exports.TimeResJobWork = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 可预约的资源排班工作实体类
 * 继承自BaseModel，用于存储可预约资源排班工作的相关信息
 */
let TimeResJobWork = class TimeResJobWork extends BaseModel_1.BaseModel {
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '资源排班ID', name: 'time_res_job_id', }),
    __metadata("design:type", String)
], TimeResJobWork.prototype, "timeResJobId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '预约用户id', name: 'user_id', }),
    __metadata("design:type", String)
], TimeResJobWork.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '预约用户留言', }),
    __metadata("design:type", String)
], TimeResJobWork.prototype, "message", void 0);
TimeResJobWork = __decorate([
    (0, typeorm_1.Entity)()
], TimeResJobWork);
exports.TimeResJobWork = TimeResJobWork;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZVJlc0pvYldvcmsuanMiLCJzb3VyY2VSb290IjoiRTovd29ya1NwYWNlL2dpdGVlL3lpcGluZy1ub2RlanMtY2xpL3NyYy8iLCJzb3VyY2VzIjpbImVudGl0eS9UaW1lUmVzSm9iV29yay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBdUM7QUFDdkMsZ0VBQTREO0FBRTVEOzs7R0FHRztBQUVILElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWUsU0FBUSxxQkFBUztDQXVCNUMsQ0FBQTtBQWhCQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEdBQUUsQ0FBQzs7b0RBQzNDO0FBTzNCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxTQUFTLEdBQUUsQ0FBQzs7OENBQ3pDO0FBT3JCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxHQUFFLENBQUM7OytDQUN2QjtBQXJCWCxjQUFjO0lBRDFCLElBQUEsZ0JBQU0sR0FBRTtHQUNJLGNBQWMsQ0F1QjFCO0FBdkJZLHdDQUFjIn0=