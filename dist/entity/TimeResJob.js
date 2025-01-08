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
exports.TimeResJob = void 0;
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 可预约的资源排班状态实体类
 * 继承自BaseModel，用于存储可预约资源的排班状态信息
 */
let TimeResJob = class TimeResJob extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 此资源最大可预约数量
         * 对应可预约资源的最大可预约数量，默认为1
         */
        this.quota = 1;
    }
};
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '内容', }),
    __metadata("design:type", String)
], TimeResJob.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '资源ID', name: 'time_res_id', }),
    __metadata("design:type", String)
], TimeResJob.prototype, "timeResId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '预约开始时间', name: 'time_start', }),
    __metadata("design:type", Date
    /**
     * 预约结束时间
     * 对应可预约资源的预约结束时间
     */
    )
], TimeResJob.prototype, "timeStart", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '预约结束时间', name: 'time_end', }),
    __metadata("design:type", Date
    /**
     * 此资源最大可预约数量
     * 对应可预约资源的最大可预约数量，默认为1
     */
    )
], TimeResJob.prototype, "timeEnd", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '此资源最大可预约数量', type: 'double', }),
    __metadata("design:type", Number)
], TimeResJob.prototype, "quota", void 0);
TimeResJob = __decorate([
    (0, typeorm_1.Entity)()
], TimeResJob);
exports.TimeResJob = TimeResJob;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZVJlc0pvYi5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsiZW50aXR5L1RpbWVSZXNKb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXVDO0FBQ3ZDLGdFQUE0RDtBQUU1RDs7O0dBR0c7QUFFSCxJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFXLFNBQVEscUJBQVM7SUFBekM7O1FBOEJFOzs7V0FHRztRQUVJLFVBQUssR0FBVyxDQUFDLENBQUE7SUFFMUIsQ0FBQztDQUFBLENBQUE7QUE5QkM7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLEdBQUUsQ0FBQzs7MkNBQ25CO0FBT3RCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxhQUFhLEdBQUUsQ0FBQzs7NkNBQ3hDO0FBT3hCO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxZQUFZLEdBQUUsQ0FBQzs4QkFDL0MsSUFBSTtJQUV0Qjs7O09BR0c7OzZDQUxtQjtBQU90QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsVUFBVSxHQUFFLENBQUM7OEJBQy9DLElBQUk7SUFFcEI7OztPQUdHOzsyQ0FMaUI7QUFPcEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRSxDQUFDOzt5Q0FDekM7QUFuQ2IsVUFBVTtJQUR0QixJQUFBLGdCQUFNLEdBQUU7R0FDSSxVQUFVLENBcUN0QjtBQXJDWSxnQ0FBVSJ9