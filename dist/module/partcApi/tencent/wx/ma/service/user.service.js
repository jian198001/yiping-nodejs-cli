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
var UserService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const decorator_1 = require("@midwayjs/decorator");
const base_service_1 = require("../../../../../common/service/base.service");
const Zero0Error_1 = require("../../../../../common/model/Zero0Error");
const fileUtils = require("../../../../../../module/common/utils/fileUtils");
/**
 * 用户服务类
 * 提供微信登录、获取微信配置、获取访问令牌、获取用户OpenID以及生成小程序码等功能
 */
let UserService = UserService_1 = class UserService extends base_service_1.BaseService {
    constructor() {
        super(...arguments);
        // 日志记录器
        this.logger = null;
        // 应用实例
        this.app = null;
        // 查询的数据库表名称及别名
        this.fromSql = ` FROM ${UserService_1 === null || UserService_1 === void 0 ? void 0 : UserService_1.TABLE_NAME} t `;
        // 查询结果集要返回的列名称，其中label和value是给select组件的option使用
        this.selectSql = ` ${base_service_1.BaseService.selSql}  
  
  `;
    }
    /**
     * 用户登录
     * @param code - 微信登录凭证
     * @param shopId - 店铺ID
     * @param sceneType - 场景类型
     * @returns 登录成功后的微信配置信息
     */
    async login(code = 'the code is a mock one', shopId = '', sceneType) {
        // 获取微信配置信息
        let wechatConfig = await (this === null || this === void 0 ? void 0 : this.getWechatConfig(shopId));
        // 配置微信小程序
        wechatConfig = {
            ...wechatConfig,
            //小程序配置
            miniProgram: {
                appId: wechatConfig.appId,
                appSecret: wechatConfig.appSecret,
            },
        };
        // 引入wechat-jssdk库
        const { Wechat } = require('wechat-jssdk'), wx = new Wechat(wechatConfig);
        // 获取微信会话信息
        const openid = await wx.miniProgram.getSession(code, null);
        // 合并微信配置和会话信息
        wechatConfig = {
            ...wechatConfig,
            ...openid,
        };
        return wechatConfig;
    }
    /**
     * 获取微信配置信息
     * @param shopId - 店铺ID
     * @returns 微信配置信息
     */
    async getWechatConfig(shopId = '') {
        var _a, _b, _c;
        let log = '查询此店铺的微信小程序配置信息';
        // 构建查询SQL语句
        const sql = ` ${this === null || this === void 0 ? void 0 : this.selectSql} ${this === null || this === void 0 ? void 0 : this.fromSql} WHERE t.shop_id = '${shopId}' `;
        // 执行查询
        const result = await ((_a = super.query) === null || _a === void 0 ? void 0 : _a.call(this, sql));
        // 如果查询结果为空，记录错误日志并抛出异常
        if (!result) {
            log = '未查询到此店铺的微信小程序配置信息';
            const zero0Error = new Zero0Error_1.Zero0Error(log, '5000');
            (_c = (_b = this === null || this === void 0 ? void 0 : this.logger) === null || _b === void 0 ? void 0 : _b.error) === null || _c === void 0 ? void 0 : _c.call(_b, log, zero0Error);
            throw zero0Error;
        }
        // 返回查询结果中的第一条记录
        const wechatConfig = result === null || result === void 0 ? void 0 : result[0];
        return wechatConfig;
    }
    /**
     * 获取微信访问令牌
     * @param shopId - 店铺ID
     * @returns 微信访问令牌
     */
    async getAccessToken(shopId = '') {
        var _a, _b;
        // 获取微信配置信息
        let wechatConfig = await (this === null || this === void 0 ? void 0 : this.getWechatConfig(shopId));
        // 配置微信小程序
        wechatConfig = {
            ...wechatConfig,
            //小程序配置
            miniProgram: {
                appId: wechatConfig.appId,
                appSecret: wechatConfig.appSecret,
            },
        };
        // 引入wechat-jssdk库
        const { Wechat } = require('wechat-jssdk'), wx = new Wechat(wechatConfig);
        // 获取微信访问令牌
        const getAccessToken = await ((_b = (_a = wx.jssdk).getAccessToken) === null || _b === void 0 ? void 0 : _b.call(_a));
        return getAccessToken.access_token;
    }
    /**
     * 获取用户OpenID
     * @param shopBuyerId - 店铺买家ID
     * @param appId - 应用ID
     * @returns 用户OpenID
     */
    async getOpenId(shopBuyerId = '', appId = '') {
        var _a, _b;
        // 构建查询SQL语句
        const sql = ` SELECT open_id FROM user_open_id WHERE  app_id = '${appId}' AND user_id = ( SELECT buyer_id FROM shop_buyer WHERE id = '${shopBuyerId}' ) `;
        // 执行查询
        const result = await ((_a = super.query) === null || _a === void 0 ? void 0 : _a.call(this, sql));
        // 如果查询结果为空，返回null
        if (!result) {
            return null;
        }
        return (_b = result === null || result === void 0 ? void 0 : result[0]) === null || _b === void 0 ? void 0 : _b.openId;
    }
    /**
     * 生成小程序码
     * @param scene - 场景值
     * @param accessToken - 微信访问令牌
     * @returns 小程序码的文件路径
     */
    async getwxacodeunlimit(scene = '', accessToken = '') {
        var _a;
        // 引入axios库
        const axios = require('axios');
        // 定义要访问的URL地址
        const url = `https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=${accessToken}`;
        // 发起POST请求
        const res = await axios.post(url, { scene: scene }, { responseType: 'arraybuffer' });
        // 将返回的二进制数据写入文件，并返回文件路径
        const uri = fileUtils === null || fileUtils === void 0 ? void 0 : fileUtils.outputFileSync(res, 'qrcode', (_a = this === null || this === void 0 ? void 0 : this.app) === null || _a === void 0 ? void 0 : _a.getAppDir());
        return uri;
    }
};
// 查询的数据库表名称
UserService.TABLE_NAME = 'wx_pay_config';
__decorate([
    (0, decorator_1.Logger)(),
    __metadata("design:type", Object)
], UserService.prototype, "logger", void 0);
__decorate([
    (0, decorator_1.App)(),
    __metadata("design:type", Object)
], UserService.prototype, "app", void 0);
UserService = UserService_1 = __decorate([
    (0, decorator_1.Provide)()
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2R1bGUvcGFydGNBcGkvdGVuY2VudC93eC9tYS9zZXJ2aWNlL3VzZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBQUEsbURBQTJEO0FBRTNELDZFQUF5RTtBQUV6RSx1RUFBb0U7QUFFcEUsNkVBQTZFO0FBRTdFOzs7R0FHRztBQUVILElBQWEsV0FBVyxtQkFBeEIsTUFBYSxXQUFZLFNBQVEsMEJBQVc7SUFBNUM7O1FBRUUsUUFBUTtRQUVBLFdBQU0sR0FBWSxJQUFJLENBQUM7UUFFL0IsT0FBTztRQUVDLFFBQUcsR0FBZ0IsSUFBSSxDQUFDO1FBS2hDLGVBQWU7UUFDUCxZQUFPLEdBQUcsU0FBUyxhQUFXLGFBQVgsYUFBVyx1QkFBWCxhQUFXLENBQUUsVUFBVSxLQUFLLENBQUM7UUFFeEQsZ0RBQWdEO1FBQ3hDLGNBQVMsR0FBRyxJQUFJLDBCQUFXLENBQUMsTUFBTTs7R0FFekMsQ0FBQztJQTBKSixDQUFDO0lBeEpDOzs7Ozs7T0FNRztJQUNJLEtBQUssQ0FBQyxLQUFLLENBQ2hCLElBQUksR0FBRyx3QkFBd0IsRUFDL0IsTUFBTSxHQUFHLEVBQUUsRUFDWCxTQUFpQjtRQUVqQixXQUFXO1FBQ1gsSUFBSSxZQUFZLEdBQVEsTUFBTSxDQUFBLElBQUksYUFBSixJQUFJLHVCQUFKLElBQUksQ0FBRSxlQUFlLENBQUMsTUFBTSxDQUFDLENBQUEsQ0FBQztRQUU1RCxVQUFVO1FBQ1YsWUFBWSxHQUFHO1lBQ2IsR0FBRyxZQUFZO1lBQ2YsT0FBTztZQUNQLFdBQVcsRUFBRTtnQkFDWCxLQUFLLEVBQUUsWUFBWSxDQUFDLEtBQUs7Z0JBQ3pCLFNBQVMsRUFBRSxZQUFZLENBQUMsU0FBUzthQUNsQztTQUNGLENBQUM7UUFFRixrQkFBa0I7UUFDbEIsTUFBTSxFQUFF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