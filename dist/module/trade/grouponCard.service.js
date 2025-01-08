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
var GrouponCardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GrouponCardService = void 0;
// 导入所需的装饰器和模块
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const GrouponCard_1 = require("../../entity/GrouponCard");
const Zero0Error_1 = require("../common/model/Zero0Error");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const _ = require("lodash");
/**
 * 团购卡服务类
 */
let GrouponCardService = GrouponCardService_1 = class GrouponCardService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${GrouponCardService_1 === null || GrouponCardService_1 === void 0 ? void 0 : GrouponCardService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  `;
        // 注入团购卡实体模型
        this.repository = null;
    }
    /**
     * 分页查询团购卡数据
     * @param query - 查询字符串
     * @param params - 参数对象
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    async page(query = '', params, reqParam, page) {
        // 分页列表查询数据
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let whereSql = ' '; // 查询条件字符串
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
     * 根据ID查询团购卡数据
     * @param id - 团购卡ID
     * @returns 查询结果
     */
    async getById(id = "") {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "根据ID查询通知消息");
        // 根据id查询一条数据
        // 查看缓存中是否有此数据
        const key = GrouponCardService_1.TABLE_NAME + `:${id}`;
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
     * 删除团购卡数据
     * @param ids - 团购卡ID数组
     * @returns 无返回值
     */
    async del(ids) {
        // 删除redis缓存
        var _a, _b, _c, _d;
        for (const id of ids) {
            const key = GrouponCardService_1.TABLE_NAME + `:${id}`;
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        }
        // 调用delete方法，根据ID删除数据
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.delete) === null || _d === void 0 ? void 0 : _d.call(_c, ids));
    }
    /**
     * 更新团购卡数据
     * @param obj - 团购卡对象
     * @returns 更新后的团购卡对象
     */
    async update(obj) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        let log = '';
        // 删除redis缓存
        const key = (GrouponCardService_1 === null || GrouponCardService_1 === void 0 ? void 0 : GrouponCardService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, GrouponCardService_1 === null || GrouponCardService_1 === void 0 ? void 0 : GrouponCardService_1.TABLE_NAME, [], obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，判断某字段值在数据库中是否已重复
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
                await ((_h = super.sortOrder) === null || _h === void 0 ? void 0 : _h.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, GrouponCardService_1 === null || GrouponCardService_1 === void 0 ? void 0 : GrouponCardService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        let old = await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.findOneById) === null || _k === void 0 ? void 0 : _k.call(_j, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_o = super.sortOrder) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, GrouponCardService_1 === null || GrouponCardService_1 === void 0 ? void 0 : GrouponCardService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
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
     * 检查团购卡基本信息
     * @param card - 团购卡对象
     * @returns 无返回值
     */
    async checkCardBaseInfo(card) { }
    /**
     * 解密团购卡代码
     * @param encryptCode - 加密的团购卡代码
     * @returns 无返回值
     */
    async decryptCardCode(encryptCode) { }
    /**
     * 查询团购卡代码
     * @param cardId - 团购卡ID
     * @param code - 团购卡代码
     * @param checkConsume - 是否检查消费
     * @returns 无返回值
     */
    async queryCardCode(cardId, code, checkConsume) { }
    /**
     * 消费团购卡代码
     * @param code - 团购卡代码
     * @returns 无返回值
     */
    async consumeCardCode(code) { }
    /**
     * 更新用户团购卡状态
     * @param memberCardOffer - 用户团购卡对象
     * @returns 无返回值
     */
    async updateUserCardStatus(memberCardOffer) { }
    /**
     * 标记团购卡代码
     * @param code - 团购卡代码
     * @param cardId - 团购卡ID
     * @param shopBuyerId - 店铺买家ID
     * @param isMark - 是否标记
     * @returns 无返回值
     */
    async markCardCode(code, cardId, shopBuyerId = '', isMark) { }
    /**
     * 获取团购卡详情
     * @param cardId - 团购卡ID
     * @returns 无返回值
     */
    async getCardDetail(cardId) { }
    /**
     * 创建团购卡
     * @param cardCreateMessage - 团购卡创建消息
     * @param goods - 团购卡商品
     * @returns 无返回值
     */
    async createCard(cardCreateMessage, goods) { }
    /**
     * 创建团购卡优惠券
     * @param cardCreateMessage - 团购卡创建消息
     * @param quantity - 数量
     * @returns 无返回值
     */
    async createCardOffer(cardCreateMessage, quantity) { }
    /**
     * 创建团购卡二维码
     * @param cardId - 团购卡ID
     * @param outerStr - 团购卡外部字符串
     * @param expiresIn - 过期时间
     * @param shopBuyerId - 店铺买家ID
     * @param code - 团购卡代码
     * @param isUniqueCode - 是否唯一代码
     * @returns 无返回值
     */
    async createQrcodeCard(cardId, outerStr, expiresIn, shopBuyerId = '', code, isUniqueCode) { }
    /**
     * 团购卡代码失效
     * @param cardId - 团购卡ID
     * @param code - 团购卡代码
     * @param reason - 原因
     * @returns 无返回值
     */
    async unavailableCardCode(cardId, code, reason) { }
    /**
     * 删除团购卡
     * @param cardId - 团购卡ID
     * @returns 无返回值
     */
    async deleteCard(cardId) { }
    /**
     * 团购卡代码储值
     * @param cardId - 团购卡ID
     * @param codeList - 团购卡代码列表
     * @returns 无返回值
     */
    async cardCodeDeposit(cardId, codeList) { }
    /**
     * 团购卡代码储值计数
     * @param cardId - 团购卡ID
     * @returns 无返回值
     */
    async cardCodeDepositCount(cardId) { }
    /**
     * 团购卡代码校验码
     * @param cardId - 团购卡ID
     * @param codeList - 团购卡代码列表
     * @returns 无返回值
     */
    async cardCodeCheckcode(cardId, codeList) { }
    /**
     * 团购卡图文消息获取html
     * @param cardId - 团购卡ID
     * @returns 无返回值
     */
    async cardMpnewsGethtml(cardId) { }
    /**
     * 团购卡库存变更
     * @param cardId - 团购卡ID
     * @param changeValue - 变更值
     * @returns 无返回值
     */
    async cardModifyStock(cardId, changeValue) { }
    /**
     * 团购卡代码更新
     * @param cardId - 团购卡ID
     * @param oldCode - 旧代码
     * @param newCode - 新代码
     * @returns 无返回值
     */
    async cardCodeUpdate(cardId, oldCode, newCode) { }
    /**
     * 团购卡支付细胞设置
     * @param cardId - 团购卡ID
     * @param isOpen - 是否开启
     * @returns 无返回值
     */
    async cardPaycellSet(cardId, isOpen) { }
    /**
     * 团购卡自主消费细胞设置
     * @param cardId - 团购卡ID
     * @param isOpen - 是否开启
     * @param needVerifyCod - 是否需要验证码
     * @param needRemarkAmount - 是否需要备注金额
     * @returns 无返回值
     */
    async cardSelfConsumeCellSet(cardId, isOpen, needVerifyCod, needRemarkAmount) { }
    /**
     * 获取用户团购卡列表
     * @param shopBuyerId - 店铺买家ID
     * @param cardId - 团购卡ID
     * @returns 无返回值
     */
    async getUserCardList(shopBuyerId = '', cardId) { }
    /**
     * 团购卡开始
     * @param code - 团购卡代码
     * @param shopBuyerId - 店铺买家ID
     * @param cardId - 团购卡ID
     * @returns 无返回值
     */
    async beginCard(code, shopBuyerId = '', cardId) { }
    /**
     * 用户获取团购卡
     * @param code - 团购卡代码
     * @param shopBuyerId - 店铺买家ID
     * @param cardId - 团购卡ID
     * @param orderItemId - 订单项ID
     * @returns 无返回值
     */
    async userGetCard(code, shopBuyerId = '', cardId, orderItemId) { }
    /**
     * 审核退款
     * @param orderId - 订单ID
     * @returns 无返回值
     */
    async auditRefund(orderId) { }
    /**
     * 激活团购卡
     * @param code - 团购卡代码
     * @param cardId - 团购卡ID
     * @param activateBeginTime - 激活开始时间
     * @param activateEndTime - 激活结束时间
     * @param initBonus - 初始奖金
     * @param initBalance - 初始余额
     * @returns 无返回值
     */
    async activate(code, cardId, activateBeginTime, activateEndTime, initBonus, initBalance) { }
};
// 查询的数据库表名称
GrouponCardService.TABLE_NAME = 'groupon_card';
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], GrouponCardService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(GrouponCard_1.GrouponCard),
    __metadata("design:type", typeorm_1.Repository)
], GrouponCardService.prototype, "repository", void 0);
GrouponCardService = GrouponCardService_1 = __decorate([
    (0, decorator_1.Provide)()
], GrouponCardService);
exports.GrouponCardService = GrouponCardService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JvdXBvbkNhcmQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJFOi93b3JrU3BhY2UvZ2l0ZWUveWlwaW5nLW5vZGVqcy1jbGkvc3JjLyIsInNvdXJjZXMiOlsibW9kdWxlL3RyYWRlL2dyb3Vwb25DYXJkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBLGNBQWM7QUFDZCxtREFBc0Q7QUFDdEQsaUVBQTZEO0FBRzdELHFDQUFxQztBQUNyQywrQ0FBc0Q7QUFDdEQsMERBQXVEO0FBRXZELDJEQUF3RDtBQUN4RCxxREFBcUQ7QUFDckQscURBQXFEO0FBQ3JELDRCQUE2QjtBQUU3Qjs7R0FFRztBQUVILElBQWEsa0JBQWtCLDBCQUEvQixNQUFhLGtCQUFtQixTQUFRLDBCQUFXO0lBQW5EOztRQUNFLFFBQVE7UUFFQSxXQUFNLEdBQVksSUFBSSxDQUFDO1FBSy9CLGVBQWU7UUFDUCxZQUFPLEdBQUcsU0FBUyxvQkFBa0IsYUFBbEIsb0JBQWtCLHVCQUFsQixvQkFBa0IsQ0FBRSxVQUFVLEtBQUssQ0FBQztRQUMvRCxzQkFBc0I7UUFDZCxjQUFTLEdBQUcsSUFBSSwwQkFBVyxDQUFDLE1BQU0sSUFBSSxDQUFDO1FBRS9DLFlBQVk7UUFFSixlQUFVLEdBQTRCLElBQUksQ0FBQztJQXVkckQsQ0FBQztJQXJkQzs7Ozs7OztPQU9HO0lBQ0ksS0FBSyxDQUFDLElBQUksQ0FDZixLQUFLLEdBQUcsRUFBRSxFQUFFLE1BQWMsRUFBRSxRQUFrQixFQUM5QyxJQUFVO1FBRVYsV0FBVzs7UUFFWCxJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsQ0FBQyxVQUFVO1FBRTlCLElBQUksVUFBVSxHQUFVLEVBQUUsQ0FBQztRQUUzQixJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMvQixVQUFVLEdBQUcsTUFBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsS0FBSyxxREFBRyxNQUFNLENB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