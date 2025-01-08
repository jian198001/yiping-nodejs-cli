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
var CashCardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashCardService = void 0;
// 导入所需的装饰器和模块
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const CashCard_1 = require("../../entity/CashCard");
const Zero0Error_1 = require("../common/model/Zero0Error");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const _ = require("lodash");
/**
 * 现金卡服务类
 */
let CashCardService = CashCardService_1 = class CashCardService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${CashCardService_1 === null || CashCardService_1 === void 0 ? void 0 : CashCardService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  `;
        // 注入现金卡实体模型
        this.repository = null;
    }
    /**
     * 分页查询现金卡数据
     * @param query - 查询字符串
     * @param params - 参数对象
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    async page(query = '', params, reqParam, page) {
        // 分页列表查询数据
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        // 查询条件字符串
        let whereSql = ' ';
        // 解析参数
        let parameters = [];
        if (params && params.length > 3) {
            parameters = (_a = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _a === void 0 ? void 0 : _a.call(JSON, params);
        }
        // 构建查询条件
        whereSql += ((_b = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.mulColumnLike) === null || _b === void 0 ? void 0 : _b.call(sqlUtils, (_c = strUtils === null || strUtils === void 0 ? void 0 : strUtils.antParams2Arr) === null || _c === void 0 ? void 0 : _c.call(strUtils, parameters, ['current', 'pageSize',]))) + ((_d = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _d === void 0 ? void 0 : _d.call(sqlUtils, ['name'], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue)) + ((_e = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _e === void 0 ? void 0 : _e.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters)) + ((_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, query)); // 处理前端的表格中筛选需求
        // 执行查询语句并返回page对象结果
        const data = await ((_g = super.pageBase) === null || _g === void 0 ? void 0 : _g.call(this, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql, whereSql, reqParam, page));
        // 遍历查询结果,将查询结果异步读取到redis
        // 遍历查询结果,将查询结果中异步读取到redis
        (_h = this === null || this === void 0 ? void 0 : this.getToRedis) === null || _h === void 0 ? void 0 : _h.call(this, (_j = _ === null || _ === void 0 ? void 0 : _.map) === null || _j === void 0 ? void 0 : _j.call(_, data === null || data === void 0 ? void 0 : data.list, 'id'));
        if ((page === null || page === void 0 ? void 0 : page.pageSize) > 0) {
            return data;
        }
        if ((page === null || page === void 0 ? void 0 : page.pageSize) < 1) {
            // pro.ant.design的select组件中的options,是valueEnum形式,不是数组而是对象,此处把page.list中数组转换成对象
            return (_k = _ === null || _ === void 0 ? void 0 : _.keyBy) === null || _k === void 0 ? void 0 : _k.call(_, data === null || data === void 0 ? void 0 : data.list, "value");
        }
    }
    async getToRedis(ids) {
        // 根据id查询一条数据
        var _a;
        for (const id of ids) {
            await ((_a = this === null || this === void 0 ? void 0 : this.getById) === null || _a === void 0 ? void 0 : _a.call(this, id));
        }
    }
    /**
     * 根据ID查询现金卡数据
     * @param id - 现金卡ID
     * @returns 查询结果
     */
    async getById(id = "") {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "根据ID查询通知消息");
        // 根据id查询一条数据
        // 查看缓存中是否有此数据
        const key = CashCardService_1.TABLE_NAME + `:${id}`;
        let data = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.redisService) === null || _c === void 0 ? void 0 : _c.get) === null || _d === void 0 ? void 0 : _d.call(_c, key));
        // 缓存中有此数据，直接返回
        if (data) {
            const parse = JSON.parse(data);
            return parse;
        }
        // 缓存中没有此数据，查询数据库
        // 调用父类的getByIdBase方法，根据ID查询数据
        data = await ((_e = super.getByIdBase) === null || _e === void 0 ? void 0 : _e.call(this, id, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql));
        // 查询数据库后，把数据放入缓存
        await ((_g = (_f = this === null || this === void 0 ? void 0 : this.redisService) === null || _f === void 0 ? void 0 : _f.set) === null || _g === void 0 ? void 0 : _g.call(_f, key, JSON.stringify(data)));
        // 返回数据
        return data;
    }
    /**
     * 删除现金卡数据
     * @param ids - 现金卡ID数组
     * @returns 无返回值
     */
    async del(ids) {
        // 删除redis缓存
        var _a, _b, _c, _d;
        for (const id of ids) {
            const key = CashCardService_1.TABLE_NAME + `:${id}`;
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        }
        // 调用delete方法，根据ID删除数据
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.delete) === null || _d === void 0 ? void 0 : _d.call(_c, ids));
    }
    /**
     * 更新现金卡数据
     * @param obj - 现金卡对象
     * @returns 更新后的现金卡对象
     */
    async update(obj) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        let log = '';
        // 删除redis缓存
        const key = (CashCardService_1 === null || CashCardService_1 === void 0 ? void 0 : CashCardService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, CashCardService_1 === null || CashCardService_1 === void 0 ? void 0 : CashCardService_1.TABLE_NAME, null, obj === null || obj === void 0 ? void 0 : obj.id));
        if (uniqueText) { // 某unique字段值已存在，抛出异常，程序处理终止
            log = uniqueText + '已存在，操作失败';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_e = (_d = this === null || this === void 0 ? void 0 : this.logger) === null || _d === void 0 ? void 0 : _d.error) === null || _e === void 0 ? void 0 : _e.call(_d, log, zero0Error);
            throw zero0Error;
        }
        // 上面是验证，下面是数据更新 -- 支持3种情况: 1. 新增数据,主键由前端生成 2. 新增数据，主键由后端生成 3. 修改数据，主键由前端传递
        if (!(obj === null || obj === void 0 ? void 0 : obj.id)) {
            // 新增数据，主键id的随机字符串值，由后端typeorm提供
            log = '新增数据，主键id的随机字符串值，由后端typeorm提供';
            obj === null || obj === void 0 ? true : delete obj.id;
            await ((_g = (_f = this === null || this === void 0 ? void 0 : this.repository) === null || _f === void 0 ? void 0 : _f.save) === null || _g === void 0 ? void 0 : _g.call(_f, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_h = super.sortOrder) === null || _h === void 0 ? void 0 : _h.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, CashCardService_1 === null || CashCardService_1 === void 0 ? void 0 : CashCardService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        let old = await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.findOneById) === null || _k === void 0 ? void 0 : _k.call(_j, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_o = super.sortOrder) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, CashCardService_1 === null || CashCardService_1 === void 0 ? void 0 : CashCardService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        obj === null || obj === void 0 ? true : delete obj.id;
        old = {
            ...old,
            ...obj,
        };
        await ((_q = (_p = this === null || this === void 0 ? void 0 : this.repository) === null || _p === void 0 ? void 0 : _p.save) === null || _q === void 0 ? void 0 : _q.call(_p, old)); // 修改数据
    }
    /**
     * 检查现金卡基本信息
     * @param card - 现金卡对象
     * @returns 无返回值
     */
    async checkCardBaseInfo(card) { }
    /**
     * 解密现金卡代码
     * @param encryptCode - 加密的现金卡代码
     * @returns 无返回值
     */
    async decryptCardCode(encryptCode) { }
    /**
     * 查询现金卡代码
     * @param cardId - 现金卡ID
     * @param code - 现金卡代码
     * @param checkConsume - 是否检查消费
     * @returns 无返回值
     */
    async queryCardCode(cardId, code, checkConsume) { }
    /**
     * 消费现金卡代码
     * @param code - 现金卡代码
     * @returns 无返回值
     */
    async consumeCardCode(code) { }
    /**
     * 更新用户现金卡状态
     * @param memberCardOffer - 用户现金卡优惠对象
     * @returns 无返回值
     */
    async updateUserCardStatus(memberCardOffer) { }
    /**
     * 标记现金卡代码
     * @param code - 现金卡代码
     * @param cardId - 现金卡ID
     * @param shopBuyerId - 店铺买家ID
     * @param isMark - 是否标记
     * @returns 无返回值
     */
    async markCardCode(code, cardId, shopBuyerId = '', isMark) { }
    /**
     * 获取现金卡详情
     * @param cardId - 现金卡ID
     * @returns 无返回值
     */
    async getCardDetail(cardId) { }
    /**
     * 创建现金卡
     * @param cardCreateMessage - 现金卡创建消息对象
     * @param goods - 商品对象
     * @returns 无返回值
     */
    async createCard(cardCreateMessage, goods) {
    }
    async createCardOffer(cardCreateMessage, quantity) { }
    async createQrcodeCard(cardId, outerStr, expiresIn, shopBuyerId = '', code, isUniqueCode) { }
    async unavailableCardCode(cardId, code, reason) { }
    async deleteCard(cardId) { }
    async cardCodeDeposit(cardId, codeList) { }
    async cardCodeDepositCount(cardId) { }
    async cardCodeCheckcode(cardId, codeList) { }
    async cardMpnewsGethtml(cardId) { }
    async cardModifyStock(cardId, changeValue) { }
    async cardCodeUpdate(cardId, oldCode, newCode) { }
    async cardPaycellSet(cardId, isOpen) { }
    async cardSelfConsumeCellSet(cardId, isOpen, needVerifyCod, needRemarkAmount) { }
    async getUserCardList(shopBuyerId = '', cardId) { }
    async beginCard(code, shopBuyerId = '', cardId) { }
    async userGetCard(code, shopBuyerId = '', cardId, orderItemId) { }
    async auditRefund(orderId) { }
    async activate(code, cardId, activateBeginTime, activateEndTime, initBonus, initBalance) { }
};
// 查询的数据库表名称
CashCardService.TABLE_NAME = 'cash_card';
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], CashCardService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(CashCard_1.CashCard),
    __metadata("design:type", typeorm_1.Repository)
], CashCardService.prototype, "repository", void 0);
CashCardService = CashCardService_1 = __decorate([
    (0, decorator_1.Provide)()
], CashCardService);
exports.CashCardService = CashCardService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FzaENhcmQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlL3RyYWRlL2Nhc2hDYXJkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxtREFBc0Q7QUFDdEQsaUVBQTZEO0FBRzdELHFDQUFxQztBQUNyQywrQ0FBc0Q7QUFDdEQsb0RBQWlEO0FBRWpELDJEQUF3RDtBQUN4RCxxREFBcUQ7QUFDckQscURBQXFEO0FBQ3JELDRCQUE2QjtBQUU3Qjs7R0FFRztBQUVILElBQWEsZUFBZSx1QkFBNUIsTUFBYSxlQUFnQixTQUFRLDBCQUFXO0lBQWhEOztRQUNFLFFBQVE7UUFFQSxXQUFNLEdBQVksSUFBSSxDQUFDO1FBSy9CLGVBQWU7UUFDUCxZQUFPLEdBQUcsU0FBUyxpQkFBZSxhQUFmLGlCQUFlLHVCQUFmLGlCQUFlLENBQUUsVUFBVSxLQUFLLENBQUM7UUFDNUQsc0JBQXNCO1FBQ2QsY0FBUyxHQUFHLElBQUksMEJBQVcsQ0FBQyxNQUFNLElBQUksQ0FBQztRQUUvQyxZQUFZO1FBRUosZUFBVSxHQUF5QixJQUFJLENBQUM7SUErVmxELENBQUM7SUE3VkM7Ozs7Ozs7T0FPRztJQUNJLEtBQUssQ0FBQyxJQUFJLENBQ2YsS0FBSyxHQUFHLEVBQUUsRUFBRSxNQUFjLEVBQUUsUUFBa0IsRUFDOUMsSUFBVTtRQUVWLFdBQVc7O1FBRVgsVUFBVTtRQUNWLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQTtRQUVsQixPQUFPO1FBQ1AsSUFBSSxVQUFVLEdBQVUsRUFBRSxDQUFBO1FBQzFCLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQy9CLFVBQVUsR0FBRyxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxLQUFLLHFEQUFHLE1BQU0sQ0FBQyxD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