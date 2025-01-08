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
var MemberCardService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberCardService = void 0;
// 导入所需的装饰器和模块
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const MemberCard_1 = require("../../entity/MemberCard");
const Zero0Error_1 = require("../common/model/Zero0Error");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const _ = require("lodash");
/**
 * 会员卡服务类
 */
let MemberCardService = MemberCardService_1 = class MemberCardService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${MemberCardService_1 === null || MemberCardService_1 === void 0 ? void 0 : MemberCardService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  
      
     `;
        // 注入会员卡实体模型
        this.repository = null;
    }
    /**
     * 分页查询会员卡数据
     * @param query - 查询字符串
     * @param params - 参数对象
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    async page(query = "", params, reqParam, page) {
        // 分页列表查询数据
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        let whereSql = " "; // 查询条件字符串
        let parameters = [];
        if (params && params.length > 3) {
            parameters = (_a = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _a === void 0 ? void 0 : _a.call(JSON, params);
        }
        // 构建查询条件
        whereSql +=
            ((_b = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.mulColumnLike) === null || _b === void 0 ? void 0 : _b.call(sqlUtils, (_c = strUtils === null || strUtils === void 0 ? void 0 : strUtils.antParams2Arr) === null || _c === void 0 ? void 0 : _c.call(strUtils, parameters, ["current", "pageSize"]))) +
                ((_d = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _d === void 0 ? void 0 : _d.call(sqlUtils, ["name"], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue)) +
                ((_e = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _e === void 0 ? void 0 : _e.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters)) +
                ((_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, query)); // 处理前端的表格中筛选需求
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
     * 根据ID查询会员卡数据
     * @param id - 会员卡ID
     * @returns 查询结果
     */
    async getById(id = "") {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "根据ID查询通知消息");
        // 根据id查询一条数据
        // 查看缓存中是否有此数据
        const key = MemberCardService_1.TABLE_NAME + `:${id}`;
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
     * 删除会员卡数据
     * @param ids - 会员卡ID数组
     * @returns 无返回值
     */
    async del(ids) {
        // 删除redis缓存
        var _a, _b, _c, _d;
        for (const id of ids) {
            const key = MemberCardService_1.TABLE_NAME + `:${id}`;
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        }
        // 调用delete方法，根据ID删除数据
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.delete) === null || _d === void 0 ? void 0 : _d.call(_c, ids));
    }
    /**
     * 更新会员卡数据
     * @param obj - 会员卡对象
     * @returns 更新后的会员卡对象
     */
    async update(obj) {
        // 一个表进行操作 typeORM
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        let log = "";
        // 删除redis缓存
        const key = (MemberCardService_1 === null || MemberCardService_1 === void 0 ? void 0 : MemberCardService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, MemberCardService_1 === null || MemberCardService_1 === void 0 ? void 0 : MemberCardService_1.TABLE_NAME, null, obj === null || obj === void 0 ? void 0 : obj.id));
        if (uniqueText) {
            // 某unique字段值已存在，抛出异常，程序处理终止
            log = uniqueText + "已存在，操作失败";
            const zero0Error = new Zero0Error_1.Zero0Error(log, "5000");
            (_e = (_d = this === null || this === void 0 ? void 0 : this.logger) === null || _d === void 0 ? void 0 : _d.error) === null || _e === void 0 ? void 0 : _e.call(_d, log, zero0Error);
            throw zero0Error;
        }
        // 上面是验证，下面是数据更新 -- 支持3种情况: 1. 新增数据,主键由前端生成 2. 新增数据，主键由后端生成 3. 修改数据，主键由前端传递
        if (!(obj === null || obj === void 0 ? void 0 : obj.id)) {
            // 新增数据，主键id的随机字符串值，由后端typeorm提供
            log = "新增数据，主键id的随机字符串值，由后端typeorm提供";
            obj === null || obj === void 0 ? true : delete obj.id;
            await ((_g = (_f = this === null || this === void 0 ? void 0 : this.repository) === null || _f === void 0 ? void 0 : _f.save) === null || _g === void 0 ? void 0 : _g.call(_f, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_h = super.sortOrder) === null || _h === void 0 ? void 0 : _h.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, MemberCardService_1 === null || MemberCardService_1 === void 0 ? void 0 : MemberCardService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            return null;
        }
        let old = await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.findOneById) === null || _k === void 0 ? void 0 : _k.call(_j, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_o = super.sortOrder) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, MemberCardService_1 === null || MemberCardService_1 === void 0 ? void 0 : MemberCardService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
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
     * 检查会员卡基本信息
     * @param card - 会员卡对象
     * @returns 无返回值
     */
    async checkCardBaseInfo(card) { }
    /**
     * 解密会员卡代码
     * @param encryptCode - 加密的会员卡代码
     * @returns 无返回值
     */
    async decryptCardCode(encryptCode) { }
    /**
     * 查询会员卡代码
     * @param cardId - 会员卡ID
     * @param code - 会员卡代码
     * @param checkConsume - 是否检查消费
     * @returns 无返回值
     */
    async queryCardCode(cardId, code, checkConsume) { }
    /**
     * 消费会员卡代码
     * @param code - 会员卡代码
     * @returns 无返回值
     */
    async consumeCardCode(code) { }
    /**
     * 更新用户会员卡状态
     * @param memberCardOffer - 用户会员卡对象
     * @returns 无返回值
     */
    async updateUserCardStatus(memberCardOffer) { }
    /**
     * 标记会员卡代码
     * @param code - 会员卡代码
     * @param cardId - 会员卡ID
     * @param shopBuyerId - 店铺买家ID
     * @param isMark - 是否标记
     * @returns 无返回值
     */
    async markCardCode(code, cardId, shopBuyerId = "", isMark) { }
    /**
     * 获取会员卡详情
     * @param cardId - 会员卡ID
     * @returns 无返回值
     */
    async getCardDetail(cardId) { }
    /**
     * 创建会员卡
     * @param cardCreateMessage - 创建会员卡消息对象
     * @param goods - 商品对象
     * @returns 无返回值
     */
    async createCard(cardCreateMessage, goods) { }
    /**
     * 创建会员卡优惠
     * @param cardCreateMessage - 创建会员卡消息对象
     * @param quantity - 数量
     * @returns 无返回值
     */
    async createCardOffer(cardCreateMessage, quantity) { }
    async createQrcodeCard(cardId, outerStr, expiresIn, shopBuyerId = "", code, isUniqueCode) { }
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
    async getUserCardList(shopBuyerId = "", cardId) { }
    async beginCard(code, shopBuyerId = "", cardId) { }
    async userGetCard(code, shopBuyerId = "", cardId, orderItemId) { }
    async auditRefund(orderId) { }
    async activate(code, cardId, activateBeginTime, activateEndTime, initBonus, initBalance) { }
};
// 查询的数据库表名称
MemberCardService.TABLE_NAME = "member_card";
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], MemberCardService.prototype, "logger", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(MemberCard_1.MemberCard),
    __metadata("design:type", typeorm_1.Repository)
], MemberCardService.prototype, "repository", void 0);
MemberCardService = MemberCardService_1 = __decorate([
    (0, decorator_1.Provide)()
], MemberCardService);
exports.MemberCardService = MemberCardService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtYmVyQ2FyZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2R1bGUvdHJhZGUvbWVtYmVyQ2FyZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxjQUFjO0FBQ2QsbURBQXNEO0FBQ3RELGlFQUE2RDtBQUc3RCxxQ0FBcUM7QUFDckMsK0NBQXNEO0FBQ3RELHdEQUFxRDtBQUVyRCwyREFBd0Q7QUFDeEQscURBQXFEO0FBQ3JELHFEQUFxRDtBQUNyRCw0QkFBNkI7QUFFN0I7O0dBRUc7QUFFSCxJQUFhLGlCQUFpQix5QkFBOUIsTUFBYSxpQkFBa0IsU0FBUSwwQkFBVztJQUFsRDs7UUFDRSxRQUFRO1FBRUEsV0FBTSxHQUFZLElBQUksQ0FBQztRQUsvQixlQUFlO1FBQ1AsWUFBTyxHQUFHLFNBQVMsbUJBQWlCLGFBQWpCLG1CQUFpQix1QkFBakIsbUJBQWlCLENBQUUsVUFBVSxLQUFLLENBQUM7UUFDOUQsc0JBQXNCO1FBQ2QsY0FBUyxHQUFHLElBQUksMEJBQVcsQ0FBQyxNQUFNOztNQUV0QyxDQUFDO1FBRUwsWUFBWTtRQUVKLGVBQVUsR0FBMkIsSUFBSSxDQUFDO0lBcVhwRCxDQUFDO0lBblhDOzs7Ozs7O09BT0c7SUFDSSxLQUFLLENBQUMsSUFBSSxDQUNmLEtBQUssR0FBRyxFQUFFLEVBQ1YsTUFBYyxFQUNkLFFBQWtCLEVBQ2xCLElBQVU7UUFFVixXQUFXOztRQUVYLElBQUksUUFBUSxHQUFHLEdBQUcsQ0FBQyxDQUFDLFVBQVU7UUFFOUIsSUFBSSxVQUFVLEdBQVUsRUFBRSxDQUFDO1FBRTNCLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQy9CLFVBQVUsR0FBRyxNQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxLQUFLLHFEQUFHLE1BQU0sQ0FB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