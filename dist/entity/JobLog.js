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
exports.JobLog = void 0;
const swagger_1 = require("@midwayjs/swagger");
const typeorm_1 = require("typeorm");
const BaseModel_1 = require("../module/common/model/BaseModel");
/**
 * 任务日志实体类
 * 用于记录任务执行的日志信息
 */
// @Entity()
class JobLog extends BaseModel_1.BaseModel {
}
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'job_id', }),
    (0, swagger_1.ApiProperty)({ description: '任务ID', }),
    __metadata("design:type", String)
], JobLog.prototype, "jobId", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'handler_name', }),
    (0, swagger_1.ApiProperty)({ description: '任务处理程序名称', }),
    __metadata("design:type", String)
], JobLog.prototype, "handlerName", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'handler_param', }),
    (0, swagger_1.ApiProperty)({ description: '任务处理程序参数', }),
    __metadata("design:type", String)
], JobLog.prototype, "handlerParam", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'cron_expression', }),
    (0, swagger_1.ApiProperty)({ description: 'cron表达式', }),
    __metadata("design:type", String)
], JobLog.prototype, "cronExpression", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'execute_index', }),
    (0, swagger_1.ApiProperty)({ description: '执行索引', }),
    __metadata("design:type", String)
], JobLog.prototype, "executeIndex", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'begin_time', }),
    (0, swagger_1.ApiProperty)({ description: '开始时间', }),
    __metadata("design:type", String)
], JobLog.prototype, "beginTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'end_time', }),
    (0, swagger_1.ApiProperty)({ description: '结束时间', }),
    __metadata("design:type", String)
], JobLog.prototype, "endTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'execute_status', }),
    (0, swagger_1.ApiProperty)({ description: '执行状态', }),
    __metadata("design:type", String)
], JobLog.prototype, "executeStatus", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'execute_time', }),
    (0, swagger_1.ApiProperty)({ description: '执行时间', }),
    __metadata("design:type", String)
], JobLog.prototype, "executeTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'execute_result', }),
    (0, swagger_1.ApiProperty)({ description: '执行结果', }),
    __metadata("design:type", String)
], JobLog.prototype, "executeResult", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'error_message', }),
    (0, swagger_1.ApiProperty)({ description: '错误信息', }),
    __metadata("design:type", String)
], JobLog.prototype, "errorMessage", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, comment: '', name: 'error_stack', }),
    (0, swagger_1.ApiProperty)({ description: '错误堆栈', }),
    __metadata("design:type", String)
], JobLog.prototype, "errorStack", void 0);
exports.JobLog = JobLog;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSm9iTG9nLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJlbnRpdHkvSm9iTG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLCtDQUE4QztBQUM5QyxxQ0FBZ0M7QUFDaEMsZ0VBQTREO0FBRTVEOzs7R0FHRztBQUNILFlBQVk7QUFDWixNQUFhLE1BQU8sU0FBUSxxQkFBUztDQWlHcEM7QUExRkM7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRSxDQUFDO0lBQ3RELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxNQUFNLEdBQUUsQ0FBQzs7cUNBQ2hCO0FBUXBCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxjQUFjLEdBQUUsQ0FBQztJQUM1RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsVUFBVSxHQUFFLENBQUM7OzJDQUNkO0FBUTFCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEdBQUUsQ0FBQztJQUM3RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsVUFBVSxHQUFFLENBQUM7OzRDQUNiO0FBUTNCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxpQkFBaUIsR0FBRSxDQUFDO0lBQy9ELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxTQUFTLEdBQUUsQ0FBQzs7OENBQ1Y7QUFRN0I7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGVBQWUsR0FBRSxDQUFDO0lBQzdELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxNQUFNLEdBQUUsQ0FBQzs7NENBQ1Q7QUFRM0I7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFlBQVksR0FBRSxDQUFDO0lBQzFELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxNQUFNLEdBQUUsQ0FBQzs7eUNBQ1o7QUFReEI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLFVBQVUsR0FBRSxDQUFDO0lBQ3hELElBQUEscUJBQVcsRUFBQyxFQUFDLFdBQVcsRUFBRSxNQUFNLEdBQUUsQ0FBQzs7dUNBQ2Q7QUFRdEI7SUFGQyxJQUFBLGdCQUFNLEVBQUMsRUFBQyxRQUFRLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixHQUFFLENBQUM7SUFDOUQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLE1BQU0sR0FBRSxDQUFDOzs2Q0FDUjtBQVE1QjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsY0FBYyxHQUFFLENBQUM7SUFDNUQsSUFBQSxxQkFBVyxFQUFDLEVBQUMsV0FBVyxFQUFFLE1BQU0sR0FBRSxDQUFDOzsyQ0FDVjtBQVExQjtJQUZDLElBQUEsZ0JBQU0sRUFBQyxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsZ0JBQWdCLEdBQUUsQ0FBQztJQUM5RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsTUFBTSxHQUFFLENBQUM7OzZDQUNSO0FBUTVCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxlQUFlLEdBQUUsQ0FBQztJQUM3RCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsTUFBTSxHQUFFLENBQUM7OzRDQUNUO0FBUTNCO0lBRkMsSUFBQSxnQkFBTSxFQUFDLEVBQUMsUUFBUSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEdBQUUsQ0FBQztJQUMzRCxJQUFBLHFCQUFXLEVBQUMsRUFBQyxXQUFXLEVBQUUsTUFBTSxHQUFFLENBQUM7OzBDQUNYO0FBL0YzQix3QkFpR0MifQ==