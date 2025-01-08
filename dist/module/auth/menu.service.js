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
exports.MenuService = void 0;
const core_1 = require("@midwayjs/core");
const base_service_1 = require("../common/service/base.service");
const Menu_1 = require("../../model/Menu");
const typegoose_1 = require("@midwayjs/typegoose");
const strUtils_1 = require("../common/utils/strUtils");
let MenuService = class MenuService extends base_service_1.BaseService {
    async update(obj) {
        var _a, _b, _c;
        console.log(obj);
        if (!(obj === null || obj === void 0 ? void 0 : obj.pid) && !(obj === null || obj === void 0 ? void 0 : obj.level) && !(obj === null || obj === void 0 ? void 0 : obj.parentId)) {
            console.log('新增一级菜单');
            // 新增一级菜单
            obj.level = 1;
            obj.pid = (0, strUtils_1.uuid)();
            await ((_a = this === null || this === void 0 ? void 0 : this.menuModel) === null || _a === void 0 ? void 0 : _a.create(obj));
            return obj;
        }
        else if ((obj === null || obj === void 0 ? void 0 : obj.level) === 1) {
            // 修改一级菜单
            console.log('修改一级菜单');
        }
        else if (obj === null || obj === void 0 ? void 0 : obj.parentId) {
            // 新增或修改二级菜单
            console.log('新增或修改二级菜单');
            if (!(obj === null || obj === void 0 ? void 0 : obj.pid)) {
                await ((_b = this === null || this === void 0 ? void 0 : this.menuModel) === null || _b === void 0 ? void 0 : _b.updateMany({ pid: obj === null || obj === void 0 ? void 0 : obj.parentId }, { $push: { children: obj } }));
            }
            else {
                // TODO
                await ((_c = this === null || this === void 0 ? void 0 : this.menuModel) === null || _c === void 0 ? void 0 : _c.updateOne({ pid: obj === null || obj === void 0 ? void 0 : obj.parentId, children: { pid: obj === null || obj === void 0 ? void 0 : obj.pid } }, { $set: { name: 'test' } }));
            }
        }
    }
    async getById(pid, level) {
        var _a, _b, _c, _d, _e, _f;
        if (level === 1) {
            const obj = await ((_b = (_a = this === null || this === void 0 ? void 0 : this.menuModel) === null || _a === void 0 ? void 0 : _a.findOne) === null || _b === void 0 ? void 0 : _b.call(_a, { pid }));
            return obj;
        }
        const list = await ((_d = (_c = this === null || this === void 0 ? void 0 : this.menuModel) === null || _c === void 0 ? void 0 : _c.find) === null || _d === void 0 ? void 0 : _d.call(_c, { 'children.pid': pid }, { 'children.$': 1 }));
        return (_f = (_e = list === null || list === void 0 ? void 0 : list[0]) === null || _e === void 0 ? void 0 : _e.children) === null || _f === void 0 ? void 0 : _f[0];
    }
    async del(pid, level) {
        var _a, _b;
        if (level === 1) {
            await ((_a = this === null || this === void 0 ? void 0 : this.menuModel) === null || _a === void 0 ? void 0 : _a.deleteOne({ pid }));
            return;
        }
        await ((_b = this === null || this === void 0 ? void 0 : this.menuModel) === null || _b === void 0 ? void 0 : _b.updateMany({}, { $pull: { children: { pid } } }));
    }
    async init() {
        // 初始化菜单
        var _a, _b;
        const count = await ((_a = this === null || this === void 0 ? void 0 : this.menuModel) === null || _a === void 0 ? void 0 : _a.countDocuments());
        if (count > 2) {
            return;
        }
        const menus = [
            {
                pid: 'a1',
                parentId: 'a0',
                name: '系统管理',
                path: '/system',
                icon: 'ep:platform',
                type: '1',
                visible: true,
                code: '0001',
                level: 1,
                children: [
                    {
                        pid: 'a100',
                        parentId: 'a1',
                        name: '成员管理',
                        path: 'staff',
                        component: 'userCenter/oa/staff/page',
                        componentName: 'SystemUser',
                        icon: 'ep:avatar',
                        type: '2',
                        visible: true,
                        code: '00010001',
                        level: 2,
                    },
                    {
                        pid: 'a101',
                        parentId: 'a1',
                        name: '角色管理',
                        path: 'role',
                        component: 'userCenter/auth/role/page',
                        componentName: 'SystemRole',
                        icon: 'ep:setting',
                        type: '2',
                        visible: true,
                        code: '00010002',
                        level: 2,
                    },
                    {
                        pid: 'a102',
                        parentId: 'a1',
                        name: '菜单管理',
                        path: 'menu',
                        component: 'userCenter/auth/menu/page',
                        componentName: 'SystemMenu',
                        icon: 'ep:menu',
                        type: '2',
                        visible: true,
                        code: '00010003',
                        level: 2,
                    },
                    {
                        pid: 'a103',
                        parentId: 'a1',
                        name: '部门管理',
                        path: 'dept',
                        component: 'userCenter/oa/dept/page',
                        componentName: 'SystemDept',
                        icon: 'ep:guide',
                        type: '2',
                        visible: true,
                        code: '00010004',
                        level: 2,
                    },
                    {
                        pid: 'a104',
                        parentId: 'a1',
                        name: '岗位管理',
                        path: 'post',
                        component: 'userCenter/oa/post/page',
                        componentName: 'SystemPost',
                        icon: 'ep:postcard',
                        type: '2',
                        visible: true,
                        code: '00010005',
                        level: 2,
                    },
                    {
                        pid: 'a107',
                        parentId: 'a1',
                        name: '通知公告',
                        path: 'notice',
                        component: 'userCenter/notice/page',
                        componentName: 'SystemNotice',
                        icon: 'ep:notification',
                        type: '2',
                        visible: true,
                        code: '00010006',
                        level: 2,
                    },
                ],
            },
            {
                pid: 'form',
                parentId: 'a0',
                name: '表单管理',
                path: '/form',
                icon: 'ep:monitor',
                type: '1',
                visible: true,
                code: '0007',
                level: 1,
                children: [
                    {
                        pid: 'formForm',
                        parentId: 'form',
                        name: '表单管理',
                        path: 'form',
                        component: 'userCenter/form/form/page',
                        componentName: 'FormForm',
                        icon: 'ep:platform',
                        type: '2',
                        visible: true,
                        code: '00070002',
                        level: 2,
                    },
                    {
                        pid: 'formSubmit',
                        parentId: 'form',
                        name: '表单提交管理',
                        path: 'formSubmit',
                        component: 'userCenter/form/formSubmit/page',
                        componentName: 'FormFormSubmit',
                        icon: 'ep:location',
                        type: '2',
                        visible: true,
                        code: '00070001',
                        level: 2,
                    },
                ],
            },
            {
                pid: 'a2',
                parentId: 'a0',
                name: '基础设施',
                path: '/infra',
                icon: 'ep:monitor',
                type: '1',
                visible: true,
                code: '0002',
                level: 1,
                children: [
                    {
                        pid: 'a2083',
                        parentId: 'a2',
                        name: '地区管理',
                        path: 'area',
                        component: 'userCenter/area/page',
                        componentName: 'SystemArea',
                        icon: 'ep:location',
                        type: '2',
                        visible: true,
                        code: '00020001',
                        level: 2,
                    },
                    {
                        pid: 'webSocket',
                        parentId: 'a2',
                        name: 'webSocket',
                        path: 'webSocket',
                        component: 'userCenter/webSocket/page',
                        componentName: 'WebSocket',
                        icon: 'ep:platform',
                        type: '2',
                        visible: true,
                        code: '00020009',
                        level: 2,
                    },
                    {
                        pid: 'a116',
                        parentId: 'a2',
                        name: '系统接口',
                        path: 'swagger',
                        component: 'userCenter/swagger/page',
                        componentName: 'InfraSwagger',
                        icon: 'ep:connection',
                        type: '2',
                        visible: true,
                        code: '00020003',
                        level: 2,
                    },
                    {
                        pid: 'a110',
                        parentId: 'a2',
                        name: '定时任务',
                        path: 'job',
                        component: 'userCenter/job/page',
                        componentName: 'InfraJob',
                        icon: 'ep:timer',
                        type: '2',
                        visible: true,
                        code: '00020004',
                        level: 2,
                    },
                    {
                        pid: 'qrcode',
                        parentId: 'a2',
                        name: '二维码',
                        path: 'qrcode',
                        component: 'userCenter/qrcode/page',
                        componentName: 'Qrcode',
                        icon: 'ep:timer',
                        type: '2',
                        visible: true,
                        code: '00020005',
                        level: 2,
                    },
                ],
            },
            {
                pid: 'a1117',
                parentId: 'a0',
                name: '商户管理',
                path: '/merchant',
                icon: 'ep:shop',
                type: '1',
                visible: true,
                code: '0003',
                level: 1,
                children: [
                    {
                        pid: 'a1179',
                        parentId: 'a1117',
                        name: '商户信息',
                        path: 'merchant',
                        component: 'userCenter/trade/merchant/merchant/page',
                        componentName: 'MerchantMerchant',
                        icon: 'ep:shop',
                        type: '2',
                        visible: true,
                        code: '00030001',
                        level: 2,
                    },
                    {
                        pid: 'buyer',
                        parentId: 'a1117',
                        name: '会员信息',
                        path: 'buyer',
                        component: 'userCenter/trade/buyer/buyer/page',
                        componentName: 'BuyerBuyer',
                        icon: 'ep:avatar',
                        type: '2',
                        visible: true,
                        code: '00030002',
                        level: 2,
                    },
                ],
            },
            {
                pid: 'a2000',
                parentId: 'a0',
                name: '商品中心',
                path: '/goods',
                icon: 'ep:goods',
                type: '1',
                visible: true,
                code: '0005',
                level: 1,
                children: [
                    {
                        pid: 'a2014',
                        parentId: 'a2000',
                        name: '商品列表',
                        path: 'spu',
                        component: 'userCenter/trade/goods/goods/page',
                        componentName: 'GoodsSpu',
                        icon: 'ep:goods',
                        type: '2',
                        visible: true,
                        code: '00050001',
                        level: 2,
                    },
                    {
                        pid: 'a2002',
                        parentId: 'a2000',
                        name: '商品分类',
                        path: 'category',
                        component: 'userCenter/trade/goods/category/page',
                        componentName: 'GoodsCategory',
                        icon: 'ep:coin',
                        type: '2',
                        visible: true,
                        code: '00050002',
                        level: 2,
                    },
                    {
                        pid: 'a2008',
                        parentId: 'a2000',
                        name: '商品品牌',
                        path: 'brand',
                        component: 'userCenter/trade/goods/brand/page',
                        componentName: 'GoodsBrand',
                        icon: 'ep:brush',
                        type: '2',
                        visible: true,
                        code: '00050003',
                        level: 2,
                    },
                ],
            },
            {
                pid: 'a2072',
                parentId: 'a0',
                name: '订单中心',
                path: '/trade',
                icon: 'fa-solid:clipboard-list',
                type: '1',
                visible: true,
                code: '0006',
                level: 1,
                children: [
                    {
                        pid: 'a2076',
                        parentId: 'a2072',
                        name: '订单列表',
                        path: 'tradeOrder',
                        component: 'userCenter/trade/tradeOrder/tradeOrder/page',
                        componentName: 'TradeOrder',
                        icon: 'ep:coordinate',
                        type: '2',
                        visible: true,
                        code: '00060001',
                        level: 2,
                    },
                    {
                        pid: 'a2077',
                        parentId: 'a2072',
                        name: '配送管理',
                        path: 'express-company',
                        component: 'userCenter/trade/tradeOrder/expressCompany/page',
                        icon: 'fa:bus',
                        type: '2',
                        visible: true,
                        code: '00060002',
                        level: 2,
                    },
                ],
            },
            {
                pid: 'a2030',
                parentId: 'a0',
                name: '营销中心',
                path: '/promotion',
                icon: 'ep:present',
                type: '1',
                visible: true,
                code: '0007',
                level: 1,
                children: [
                    {
                        pid: 'a2059',
                        parentId: 'a2030',
                        name: '卡券核销',
                        path: 'seckill-activity',
                        component: 'userCenter/trade/promotion/seckill/seckillActivity/page',
                        componentName: 'PromotionSeckillActivity',
                        icon: 'ep:postcard',
                        type: '2',
                        visible: true,
                        code: '00070001',
                        level: 2,
                    },
                    {
                        pid: 'a2032',
                        parentId: 'a2030',
                        name: '优惠劵',
                        path: 'coupon-template',
                        component: 'userCenter/trade/promotion/couponTemplate/page',
                        componentName: 'PromotionCouponTemplate',
                        icon: 'ep:postcard',
                        type: '2',
                        visible: true,
                        code: '00070002',
                        level: 2,
                    },
                    {
                        pid: 'profitSharing',
                        parentId: 'a2030',
                        name: '用户分账',
                        path: 'profitSharing',
                        component: 'userCenter/trade/buyer/profitSharing/page',
                        componentName: 'BuyerProfitSharing',
                        icon: 'ep:avatar',
                        type: '2',
                        visible: true,
                        code: '00070003',
                        level: 2,
                    },
                ],
            },
            {
                pid: 'content',
                parentId: 'a0',
                name: '内容管理',
                path: '/content',
                icon: 'ep:message-box',
                type: '1',
                visible: true,
                code: '0008',
                level: 1,
                children: [
                    {
                        pid: 'article',
                        parentId: 'content',
                        name: '文章管理',
                        path: 'article',
                        component: 'userCenter/content/article/page',
                        componentName: 'ContentArticle',
                        icon: 'ep:document',
                        type: '2',
                        visible: true,
                        code: '00080001',
                        level: 2,
                    },
                    {
                        pid: 'category',
                        parentId: 'content',
                        name: '栏目管理',
                        path: 'category',
                        component: 'userCenter/content/category/page',
                        componentName: 'ContentCategory',
                        icon: 'ep:document-copy',
                        type: '2',
                        visible: true,
                        code: '00080002',
                        level: 2,
                    },
                ],
            },
            {
                pid: 'material',
                parentId: 'a0',
                name: '物料管理',
                path: '/material',
                icon: 'ep:message-box',
                type: '1',
                visible: true,
                code: '0009',
                level: 1,
                children: [
                    {
                        pid: 'purchase',
                        parentId: 'material',
                        name: '采购管理',
                        path: 'purchase',
                        component: 'userCenter/material/purchase/page',
                        componentName: 'MaterialPurchase',
                        icon: 'ep:document',
                        type: '2',
                        visible: true,
                        code: '00090001',
                        level: 2,
                    },
                    {
                        pid: 'stock',
                        parentId: 'material',
                        name: '库存管理',
                        path: 'stock',
                        component: 'userCenter/material/stock/page',
                        componentName: 'MaterialStock',
                        icon: 'ep:document',
                        type: '2',
                        visible: true,
                        code: '00090002',
                        level: 2,
                    },
                    {
                        pid: 'consume',
                        parentId: 'material',
                        name: '物料领用情况',
                        path: 'consume',
                        component: 'userCenter/material/consume/page',
                        componentName: 'MaterialConsume',
                        icon: 'ep:document',
                        type: '2',
                        visible: true,
                        code: '00090003',
                        level: 2,
                    },
                    {
                        pid: 'instock',
                        parentId: 'material',
                        name: '物料出入库日志',
                        path: 'instock',
                        component: 'userCenter/material/instock/page',
                        componentName: 'MaterialInstock',
                        icon: 'ep:document',
                        type: '2',
                        visible: true,
                        code: '00090005',
                        level: 2,
                    },
                ],
            },
        ];
        for (const element of menus) {
            await ((_b = this === null || this === void 0 ? void 0 : this.menuModel) === null || _b === void 0 ? void 0 : _b.create(element));
        }
    }
};
__decorate([
    (0, typegoose_1.InjectEntityModel)(Menu_1.Menu),
    __metadata("design:type", Object)
], MenuService.prototype, "menuModel", void 0);
MenuService = __decorate([
    (0, core_1.Provide)()
], MenuService);
exports.MenuService = MenuService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IkU6L3dvcmtTcGFjZS9naXRlZS95aXBpbmctbm9kZWpzLWNsaS9zcmMvIiwic291cmNlcyI6WyJtb2R1bGUvYXV0aC9tZW51LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEseUNBQXlDO0FBQ3pDLGlFQUE2RDtBQUM3RCwyQ0FBd0M7QUFFeEMsbURBQXdEO0FBRXhELHVEQUFnRDtBQUdoRCxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFZLFNBQVEsMEJBQVc7SUFJbkMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFTOztRQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRWpCLElBQUksQ0FBQyxDQUFBLEdBQUcsYUFBSCxHQUFHLHVCQUFILEdBQUcsQ0FBRSxHQUFHLENBQUEsSUFBSSxDQUFDLENBQUEsR0FBRyxhQUFILEdBQUcsdUJBQUgsR0FBRyxDQUFFLEtBQUssQ0FBQSxJQUFJLENBQUMsQ0FBQSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsUUFBUSxDQUFBLEVBQUU7WUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUV0QixTQUFTO1lBRVQsR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7WUFFZCxHQUFHLENBQUMsR0FBRyxHQUFHLElBQUEsZUFBSSxHQUFFLENBQUM7WUFFakIsTUFBTSxDQUFBLE1BQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLFNBQVMsMENBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFBLENBQUM7WUFFbkMsT0FBTyxHQUFHLENBQUM7U0FDWjthQUFNLElBQUksQ0FBQSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsS0FBSyxNQUFLLENBQUMsRUFBRTtZQUMzQixTQUFTO1lBRVQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQztT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