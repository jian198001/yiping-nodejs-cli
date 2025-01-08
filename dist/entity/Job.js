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
exports.Job = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 任务实体类
 * 用于表示任务的基本信息
 */
// @Entity()
class Job extends BaseModel_1.BaseModel {
    constructor() {
        super(...arguments);
        /**
         * 重试次数
         * 任务执行失败后的重试次数
         */
        this.retryCount = null;
        /**
         * 重试间隔
         * 任务执行失败后的重试间隔时间（单位：秒）
         */
        this.retryInterval = null;
        /**
         * 监控超时时间
         * 任务执行的监控超时时间（单位：秒）
         */
        this.monitorTimeout = null;
    }
}
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'handler_name', }),
    (0, swagger_1.ApiProperty)({ description: '任务处理程序名称', }),
    __metadata("design:type", String)
], Job.prototype, "handlerName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'handler_param', }),
    (0, swagger_1.ApiProperty)({ description: '任务处理程序参数', }),
    __metadata("design:type", String)
], Job.prototype, "handlerParam", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'cron_expression', }),
    (0, swagger_1.ApiProperty)({ description: 'cron表达式', }),
    __metadata("design:type", String)
], Job.prototype, "cronExpression", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'retry_count', }),
    (0, swagger_1.ApiProperty)({ description: '重试次数', }),
    __metadata("design:type", Number)
], Job.prototype, "retryCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'retry_interval', }),
    (0, swagger_1.ApiProperty)({ description: '重试间隔（单位：秒）', }),
    __metadata("design:type", Number)
], Job.prototype, "retryInterval", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'monitor_timeout', }),
    (0, swagger_1.ApiProperty)({ description: '监控超时时间（单位：秒）', }),
    __metadata("design:type", Number)
], Job.prototype, "monitorTimeout", void 0);
exports.Job = Job;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9iLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvSm9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtDQUE4QztBQUM5QyxxQ0FBZ0M7QUFDaEMsZ0VBQTREO0FBRTVEOzs7R0FHRztBQUNILFlBQVk7QUFDWixNQUFhLEdBQUksU0FBUSxxQkFBUztJQUFsQzs7UUF5QkU7OztXQUdHO1FBR0ksZUFBVSxHQUFXLElBQUksQ0FBQztRQUVqQzs7O1dBR0c7UUFHSSxrQkFBYSxHQUFXLElBQUksQ0FBQztRQUVwQzs7O1dBR0c7UUFHSSxtQkFBYyxHQUFXLElBQUksQ0FBQztJQUN2QyxDQUFDO0NBQUE7QUF6Q0M7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGNBQWMsR0FBRSxDQUFDO0lBQzVELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxVQUFVLEdBQUUsQ0FBQzs7d0NBQ2Q7QUFRMUI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsR0FBRSxDQUFDO0lBQzdELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxVQUFVLEdBQUUsQ0FBQzs7eUNBQ2I7QUFRM0I7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGlCQUFpQixHQUFFLENBQUM7SUFDL0QsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLFNBQVMsR0FBRSxDQUFDOzsyQ0FDVjtBQVE3QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxHQUFFLENBQUM7SUFDM0QsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLE1BQU0sR0FBRSxDQUFDOzt1Q0FDSDtBQVFqQztJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEdBQUUsQ0FBQztJQUM5RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsWUFBWSxHQUFFLENBQUM7OzBDQUNOO0FBUXBDO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBaUIsR0FBRSxDQUFDO0lBQy9ELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxjQUFjLEdBQUUsQ0FBQzs7MkNBQ1A7QUEvQ3ZDLGtCQWdEQyJ9