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
var CredentialsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../../common/service/base.service");
const _ = require("lodash");
const typeorm_1 = require("@midwayjs/typeorm");
const typeorm_2 = require("typeorm");
const GoogleCredentials_1 = require("../../../entity/GoogleCredentials");
const objUtils = require('../../common/utils/objUtils');
let CredentialsService = CredentialsService_1 = class CredentialsService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        this.repository = null;
    }
    /**
     * 更新或插入Google凭据
     * @param obj - 包含Google凭据信息的对象
     * @returns 更新或插入后的Google凭据对象，如果是插入操作则返回null
     */
    async update(obj) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o;
        let log = '';
        // 如果googleId已存在，则返回这个googleId对应的数据
        const sql = ` SELECT t.* FROM google_credentials t WHERE t.google_id = '${obj.googleId}' `;
        const results = await ((_a = super.query) === null || _a === void 0 ? void 0 : _a.call(this, sql));
        if (results && results.length > 0) {
            // 将查询结果的第一条记录转换为驼峰命名格式并返回
            return (_b = objUtils === null || objUtils === void 0 ? void 0 : objUtils.camelCase) === null || _b === void 0 ? void 0 : _b.call(objUtils, (_c = _ === null || _ === void 0 ? void 0 : _.head) === null || _c === void 0 ? void 0 : _c.call(_, results));
        }
        // 如果obj.id为空，说明这是一个新记录
        if (!(obj === null || obj === void 0 ? void 0 : obj.id)) {
            console.log('obj?.id is empty');
            // 记录日志，表示这是一个新增数据操作，主键id由后端typeorm提供
            log = '新增数据，主键id的随机字符串值，由后端typeorm提供';
            // 删除obj中的id属性，因为这是一个新记录，不需要指定id
            obj === null || obj === void 0 ? true : delete obj.id;
            // 调用repository.save方法插入新记录
            await ((_e = (_d = this === null || this === void 0 ? void 0 : this.repository) === null || _d === void 0 ? void 0 : _d.save) === null || _e === void 0 ? void 0 : _e.call(_d, obj)); // insert update
            // 如果obj中没有orderNum，则调用sortOrder方法设置排序值
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_f = super.sortOrder) === null || _f === void 0 ? void 0 : _f.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, CredentialsService_1 === null || CredentialsService_1 === void 0 ? void 0 : CredentialsService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            // 返回null，表示插入操作成功
            return null;
        }
        // 如果obj.id不为空，说明这是一个更新操作
        let old = await ((_h = (_g = this === null || this === void 0 ? void 0 : this.repository) === null || _g === void 0 ? void 0 : _g.findOneById) === null || _h === void 0 ? void 0 : _h.call(_g, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        console.log('old: ' + JSON.stringify(old));
        // 如果查询结果为空，说明这是一个新记录
        if (!old) {
            // 记录日志，表示这是一个新增数据操作，主键id由前端页面提供
            console.log(JSON.stringify(obj));
            // 调用repository.save方法插入新记录
            await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.save) === null || _k === void 0 ? void 0 : _k.call(_j, obj)); // insert update
            // 如果obj中没有orderNum，则调用sortOrder方法设置排序值
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_l = super.sortOrder) === null || _l === void 0 ? void 0 : _l.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, CredentialsService_1 === null || CredentialsService_1 === void 0 ? void 0 : CredentialsService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            // 返回null，表示插入操作成功
            return null;
        }
        // 删除obj中的id属性，因为id不应该被更新
        obj === null || obj === void 0 ? true : delete obj.id;
        // 将obj的属性合并到old对象中
        old = {
            ...old,
            ...obj,
        };
        console.log(log);
        // 调用repository.save方法更新记录
        await ((_o = (_m = this === null || this === void 0 ? void 0 : this.repository) === null || _m === void 0 ? void 0 : _m.save) === null || _o === void 0 ? void 0 : _o.call(_m, old)); // 修改数据
    }
};
// 查询的数据库表名称
CredentialsService.TABLE_NAME = 'google_credentials';
__decorate([
    (0, typeorm_1.InjectEntityModel)(GoogleCredentials_1.GoogleCredentials),
    __metadata("design:type", typeorm_2.Repository)
], CredentialsService.prototype, "repository", void 0);
CredentialsService = CredentialsService_1 = __decorate([
    (0, decorator_1.Provide)()
], CredentialsService);
exports.CredentialsService = CredentialsService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlZGVudGlhbHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlL3BhcnRjQXBpL2dvb2dsZS9jcmVkZW50aWFscy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxtREFBOEM7QUFDOUMsb0VBQWdFO0FBQ2hFLDRCQUE2QjtBQUU3QiwrQ0FBc0Q7QUFDdEQscUNBQXFDO0FBQ3JDLHlFQUFzRTtBQUV0RSxNQUFNLFFBQVEsR0FBUSxPQUFPLENBQUMsNkJBQTZCLENBQUMsQ0FBQztBQUc3RCxJQUFhLGtCQUFrQiwwQkFBL0IsTUFBYSxrQkFBbUIsU0FBUSwwQkFBVztJQUFuRDs7UUFNVSxlQUFVLEdBQWtDLElBQUksQ0FBQztJQW1GM0QsQ0FBQztJQWpGQzs7OztPQUlHO0lBQ0ksS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFzQjtRQUN4QyxrQkFBa0I7O1FBRWxCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUViLG1DQUFtQztRQUVuQyxNQUFNLEdBQUcsR0FBRyw4REFBOEQsR0FBRyxDQUFDLFFBQVEsSUFBSSxDQUFBO1FBRTFGLE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQSxNQUFBLEtBQUssQ0FBQyxLQUFLLHFEQUFHLEdBQUcsQ0FBQyxDQUFBLENBQUE7UUFFeEMsSUFBSSxPQUFPLElBQUksT0FBTyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFFakMsMEJBQTBCO1lBQzFCLE9BQU8sTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsU0FBUyx5REFBRyxNQUFBLENBQUMsYUFBRCxDQUFDLHVCQUFELENBQUMsQ0FBRSxJQUFJLGtEQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUE7U0FFakQ7UUFFRCx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLENBQUEsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FB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