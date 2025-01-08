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
var GoodsCategoryService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoodsCategoryService = void 0;
// 导入所需的模块和装饰器
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../common/service/base.service");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@midwayjs/typeorm");
const GoodsCategory_1 = require("../../entity/GoodsCategory");
const MultipartFile_1 = require("../../entity/MultipartFile");
const Zero0Error_1 = require("../common/model/Zero0Error");
const _ = require("lodash");
const sqlUtils = require("../common/utils/sqlUtils");
const strUtils = require("../common/utils/strUtils");
const fileUtils = require("../common/utils/fileUtils");
/**
 * 商品分类服务类
 */
let GoodsCategoryService = GoodsCategoryService_1 = class GoodsCategoryService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 应用实例
        this.app = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${GoodsCategoryService_1 === null || GoodsCategoryService_1 === void 0 ? void 0 : GoodsCategoryService_1.TABLE_NAME} t `;
        // 查询的字段名称及头部的SELECT语句
        this.selectSql = ` ${base_service_1.BaseService.selSql}  

  , t.id AS cat_id

  , t.name AS cat_name

    , ( SELECT uri FROM multipart_file WHERE multipart_file.ext_id = t.id LIMIT 0,1 ) AS img

    , ( SELECT uri FROM multipart_file WHERE multipart_file.ext_id = t.id LIMIT 0,1 ) AS back_img

    , LENGTH(code)/4 AS level 

     `;
        // 注入商品分类实体模型
        this.repository = null;
        // 注入文件上传实体模型
        this.multipartFileRepository = null;
    }
    /**
     * 分页查询商品分类数据
     * @param shopId - 店铺ID
     * @param query - 查询字符串
     * @param params - 参数对象
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns 分页查询结果
     */
    async page(shopId = "", query = "", params, reqParam, page) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        // 查询条件字符串
        let whereSql = " ";
        // 根据店铺ID筛选
        if (shopId) {
            whereSql += ` AND t.shop_id = '${shopId}' `;
        }
        // 处理前端的搜索字符串的搜索需求
        whereSql += (_a = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.like) === null || _a === void 0 ? void 0 : _a.call(sqlUtils, ["name"], reqParam === null || reqParam === void 0 ? void 0 : reqParam.searchValue);
        // 处理前端的表格中筛选需求
        whereSql += (_b = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.whereOrFilters) === null || _b === void 0 ? void 0 : _b.call(sqlUtils, reqParam === null || reqParam === void 0 ? void 0 : reqParam.filters);
        // 处理前端的分页参数
        whereSql += (_c = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.mulColumnLike) === null || _c === void 0 ? void 0 : _c.call(sqlUtils, (_d = strUtils === null || strUtils === void 0 ? void 0 : strUtils.antParams2Arr) === null || _d === void 0 ? void 0 : _d.call(strUtils, (_e = JSON === null || JSON === void 0 ? void 0 : JSON.parse) === null || _e === void 0 ? void 0 : _e.call(JSON, params), ['current', 'pageSize',]));
        // 处理查询字符串
        whereSql += (_f = sqlUtils === null || sqlUtils === void 0 ? void 0 : sqlUtils.query) === null || _f === void 0 ? void 0 : _f.call(sqlUtils, query);
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
     * 根据ID查询商品分类数据
     * @param id - 商品分类ID
     * @returns 查询结果
     */
    async getById(id = "") {
        var _a, _b, _c, _d, _e, _f, _g;
        // 记录日志
        (_b = (_a = this === null || this === void 0 ? void 0 : this.logger) === null || _a === void 0 ? void 0 : _a.info) === null || _b === void 0 ? void 0 : _b.call(_a, "根据ID查询通知消息");
        // 根据id查询一条数据
        // 查看缓存中是否有此数据
        const key = GoodsCategoryService_1.TABLE_NAME + `:${id}`;
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
     * 获取商品分类的子分类
     * @param parentId - 父级分类ID
     * @param reqParam - 请求参数对象
     * @returns 商品分类的子分类数组
     */
    async arrPane(parentId, reqParam) {
        // 按照NutUI的格式，通过第一级商品栏目的ID，取得对应下两级商品栏目信息
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        // 通过栏目的id，取得栏目的code
        const obj = await ((_b = (_a = this === null || this === void 0 ? void 0 : this.repository) === null || _a === void 0 ? void 0 : _a.findOneById) === null || _b === void 0 ? void 0 : _b.call(_a, parentId));
        const parentCode = obj.code;
        // 通过like语句，一次性查询此栏目下的所有子栏目信息
        const whereSql = ` AND t.code LIKE '${parentCode}%' AND LENGTH(t.code) > 7 `;
        const anies = await ((_c = super.arrBase) === null || _c === void 0 ? void 0 : _c.call(this, reqParam, this === null || this === void 0 ? void 0 : this.selectSql, this === null || this === void 0 ? void 0 : this.fromSql, whereSql));
        const arr = [];
        // 将二级目录筛选出来，放到arr中
        for (const element of anies) {
            if (((_d = element === null || element === void 0 ? void 0 : element.code) === null || _d === void 0 ? void 0 : _d.length) === 8) {
                (_e = arr === null || arr === void 0 ? void 0 : arr.push) === null || _e === void 0 ? void 0 : _e.call(arr, element);
                continue;
            }
        }
        // 将对应的三级栏目整合到二级栏目下
        for (const element of arr) {
            const code = element === null || element === void 0 ? void 0 : element.code;
            for (const aniesOne of anies) {
                const subCode = aniesOne === null || aniesOne === void 0 ? void 0 : aniesOne.code;
                if (subCode.length === 12 && ((_f = _ === null || _ === void 0 ? void 0 : _.startsWith) === null || _f === void 0 ? void 0 : _f.call(_, subCode, code))) {
                    if (!(element === null || element === void 0 ? void 0 : element.childCateList) || !((_g = element === null || element === void 0 ? void 0 : element.childCateList) === null || _g === void 0 ? void 0 : _g.length)) {
                        element.childCateList = [];
                    }
                    (_j = (_h = element === null || element === void 0 ? void 0 : element.childCateList) === null || _h === void 0 ? void 0 : _h.push) === null || _j === void 0 ? void 0 : _j.call(_h, aniesOne);
                }
            }
        }
        return arr;
    }
    /**
     * 删除商品分类数据
     * @param ids - 商品分类ID数组
     * @returns 无返回值
     */
    async del(ids) {
        // 删除redis缓存
        var _a, _b, _c, _d;
        for (const id of ids) {
            const key = GoodsCategoryService_1.TABLE_NAME + `:${id}`;
            await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        }
        // 调用delete方法，根据ID删除数据
        await ((_d = (_c = this === null || this === void 0 ? void 0 : this.repository) === null || _c === void 0 ? void 0 : _c.delete) === null || _d === void 0 ? void 0 : _d.call(_c, ids));
    }
    /**
     * 更新商品分类数据
     * @param obj - 商品分类对象
     * @returns 更新后的商品分类对象
     */
    async update(obj) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
        // 一个表进行操作 typeORM
        let log = "";
        // 删除redis缓存
        const key = (GoodsCategoryService_1 === null || GoodsCategoryService_1 === void 0 ? void 0 : GoodsCategoryService_1.TABLE_NAME) + `:${obj === null || obj === void 0 ? void 0 : obj.id}`;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.redisService) === null || _a === void 0 ? void 0 : _a.del) === null || _b === void 0 ? void 0 : _b.call(_a, key));
        // 字段非重复性验证
        const uniqueText = await ((_c = super.unique) === null || _c === void 0 ? void 0 : _c.call(this, GoodsCategoryService_1 === null || GoodsCategoryService_1 === void 0 ? void 0 : GoodsCategoryService_1.TABLE_NAME, [], obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，判断某字段值在数据库中是否已重复
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
                await ((_h = super.sortOrder) === null || _h === void 0 ? void 0 : _h.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, GoodsCategoryService_1 === null || GoodsCategoryService_1 === void 0 ? void 0 : GoodsCategoryService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            if (!(obj === null || obj === void 0 ? void 0 : obj.code)) {
                await (this === null || this === void 0 ? void 0 : this.updateCode(obj));
            }
            return obj;
        }
        let old = await ((_k = (_j = this === null || this === void 0 ? void 0 : this.repository) === null || _j === void 0 ? void 0 : _j.findOneById) === null || _k === void 0 ? void 0 : _k.call(_j, obj === null || obj === void 0 ? void 0 : obj.id)); // 新增或修改数据时，先根据id查询,如此id在数据库中不存在，则是新增，如已存在，则是修改
        if (!old) {
            // 新增数据，主键id的随机字符串值，由前端页面提供
            await ((_m = (_l = this === null || this === void 0 ? void 0 : this.repository) === null || _l === void 0 ? void 0 : _l.save) === null || _m === void 0 ? void 0 : _m.call(_l, obj)); // insert update
            if (!(obj === null || obj === void 0 ? void 0 : obj.orderNum)) {
                await ((_o = super.sortOrder) === null || _o === void 0 ? void 0 : _o.call(this, obj === null || obj === void 0 ? void 0 : obj.id, null, null, GoodsCategoryService_1 === null || GoodsCategoryService_1 === void 0 ? void 0 : GoodsCategoryService_1.TABLE_NAME)); // 新增数据时，设置此条数据的orderNum排序值
            }
            if (!(obj === null || obj === void 0 ? void 0 : obj.code)) {
                await (this === null || this === void 0 ? void 0 : this.updateCode(obj));
            }
            return obj;
        }
        obj === null || obj === void 0 ? true : delete obj.id;
        old = {
            ...old,
            ...obj,
        };
        await ((_q = (_p = this === null || this === void 0 ? void 0 : this.repository) === null || _p === void 0 ? void 0 : _p.save) === null || _q === void 0 ? void 0 : _q.call(_p, old)); // 修改数据
        if (!(old === null || old === void 0 ? void 0 : old.code)) {
            await (this === null || this === void 0 ? void 0 : this.updateCode(old));
        }
        return old;
    }
    async updateCode(obj) {
        // 如果parentCode为空，则生成一个4位的code
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const parentId = obj.parentId;
        if (!parentId) {
            // TODO 如果parentId为空，则从当前级别code中选取最大的code来加1
            obj.code = await ((_a = super.getCode) === null || _a === void 0 ? void 0 : _a.call(this, null, GoodsCategoryService_1 === null || GoodsCategoryService_1 === void 0 ? void 0 : GoodsCategoryService_1.TABLE_NAME, 4));
            await ((_c = (_b = this === null || this === void 0 ? void 0 : this.repository) === null || _b === void 0 ? void 0 : _b.save) === null || _c === void 0 ? void 0 : _c.call(_b, obj));
            return;
        }
        const parent = await ((_e = (_d = this === null || this === void 0 ? void 0 : this.repository) === null || _d === void 0 ? void 0 : _d.findOneById) === null || _e === void 0 ? void 0 : _e.call(_d, parentId));
        const parentCode = parent === null || parent === void 0 ? void 0 : parent.code;
        const code = await ((_f = super.getCode) === null || _f === void 0 ? void 0 : _f.call(this, parentCode, GoodsCategoryService_1 === null || GoodsCategoryService_1 === void 0 ? void 0 : GoodsCategoryService_1.TABLE_NAME, 4));
        obj.code = code;
        await ((_h = (_g = this === null || this === void 0 ? void 0 : this.repository) === null || _g === void 0 ? void 0 : _g.save) === null || _h === void 0 ? void 0 : _h.call(_g, obj));
    }
    async imgUpload(files, query) {
        // 一个商品分类只能对应一个图片，所以上传新图片前删除旧图片
        var _a, _b, _c;
        await (this === null || this === void 0 ? void 0 : this.imgDel(query === null || query === void 0 ? void 0 : query.id));
        // 得到当前上传文件的暂存文件路径
        const file = files === null || files === void 0 ? void 0 : files[0];
        const uri = fileUtils === null || fileUtils === void 0 ? void 0 : fileUtils.copySync(file, "goodsCategory", (_a = this === null || this === void 0 ? void 0 : this.app) === null || _a === void 0 ? void 0 : _a.getAppDir());
        // public/fileLoad/upload/新文件名，作为multipart_file表的uri字段值，业务ID（如传送的是车辆的驾驶证，则业务ID是car表的pid），作为multipart_file表的ext_id,ext_type是car_行驶证的英文
        const multipartFile = new MultipartFile_1.MultipartFile();
        multipartFile.uri = uri;
        multipartFile.extId = query === null || query === void 0 ? void 0 : query.id;
        // multipartFile.extType = query?.mimeType
        await ((_c = (_b = this === null || this === void 0 ? void 0 : this.multipartFileRepository) === null || _b === void 0 ? void 0 : _b.save) === null || _c === void 0 ? void 0 : _c.call(_b, multipartFile));
        // 把multipart_file对象信息返回
        return multipartFile;
    }
    async imgDel(id) {
        var _a, _b;
        await ((_b = (_a = this === null || this === void 0 ? void 0 : this.multipartFileRepository) === null || _a === void 0 ? void 0 : _a.delete) === null || _b === void 0 ? void 0 : _b.call(_a, { extId: id }));
    }
    /**
     * getMaxCodeLength
     */
    async getMaxCodeLength() {
        // 1代表1层目录，2代表2层目录，3代表3层目录
        var _a, _b;
        const sql = ` SELECT LENGTH(code)/4  AS code_length ${this === null || this === void 0 ? void 0 : this.fromSql} WHERE code = MAX(code)  `;
        return await ((_b = (_a = super.query) === null || _a === void 0 ? void 0 : _a.call(this, sql)[0]) === null || _b === void 0 ? void 0 : _b.code_length);
    }
};
// 查询的数据库表名称
GoodsCategoryService.TABLE_NAME = "goods_category";
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], GoodsCategoryService.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.App)(),
    __metadata("design:type", Object)
], GoodsCategoryService.prototype, "app", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(GoodsCategory_1.GoodsCategory),
    __metadata("design:type", typeorm_1.Repository)
], GoodsCategoryService.prototype, "repository", void 0);
__decorate([
    (0, typeorm_2.InjectEntityModel)(MultipartFile_1.MultipartFile),
    __metadata("design:type", typeorm_1.Repository)
], GoodsCategoryService.prototype, "multipartFileRepository", void 0);
GoodsCategoryService = GoodsCategoryService_1 = __decorate([
    (0, decorator_1.Provide)()
], GoodsCategoryService);
exports.GoodsCategoryService = GoodsCategoryService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ29vZHNDYXRlZ29yeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2R1bGUvdHJhZGUvZ29vZHNDYXRlZ29yeS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFBQSxjQUFjO0FBQ2QsbURBQTJEO0FBRTNELGlFQUE2RDtBQUc3RCxxQ0FBcUM7QUFDckMsK0NBQXNEO0FBQ3RELDhEQUEyRDtBQUMzRCw4REFBMkQ7QUFFM0QsMkRBQXdEO0FBQ3hELDRCQUE2QjtBQUM3QixxREFBcUQ7QUFDckQscURBQXFEO0FBQ3JELHVEQUF1RDtBQUV2RDs7R0FFRztBQUVILElBQWEsb0JBQW9CLDRCQUFqQyxNQUFhLG9CQUFxQixTQUFRLDBCQUFXO0lBQXJEOztRQUNFLFFBQVE7UUFFQSxXQUFNLEdBQVksSUFBSSxDQUFDO1FBRS9CLE9BQU87UUFFQyxRQUFHLEdBQWdCLElBQUksQ0FBQztRQUtoQyxlQUFlO1FBQ1AsWUFBTyxHQUFHLFNBQVMsc0JBQW9CLGFBQXBCLHNCQUFvQix1QkFBcEIsc0JBQW9CLENBQUUsVUFBVSxLQUFLLENBQUM7UUFFakUsc0JBQXNCO1FBQ2QsY0FBUyxHQUFHLElBQUksMEJBQVcsQ0FBQyxNQUFNOzs7Ozs7Ozs7Ozs7TUFZdEMsQ0FBQztRQUVMLGFBQWE7UUFFTCxlQUFVLEdBQThCLElBQUksQ0FBQztRQUVyRCxhQUFhO1FBRUwsNEJBQXVCLEdBQThCLElBQUksQ0FBQztJQWdXcEUsQ0FBQztJQTlWQzs7Ozs7Ozs7T0FRRztJQUNJLEtBQUssQ0FBQyxJQUFJLENBQ2YsTUFBTSxHQUFHLEVBQUUsRUFDWCxLQUFLLEdBQUcsRUFBRSxFQUNWLE1BQWMsRUFDZCxRQUFrQixFQUNsQixJQUFVOztRQUVWLFVBQVU7UUFDVixJQUFJLFFBQVEsR0FBRyxHQUFHLENBQUM7UUFFbkIsV0FBVztRQUNYLElBQUksTUFB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