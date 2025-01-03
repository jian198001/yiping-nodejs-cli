import { Provide } from '@midwayjs/core';
import { BaseService } from '../common/service/base.service';
import { Menu } from '../../model/Menu';
import { ReturnModelType } from '@typegoose/typegoose';
import { InjectEntityModel } from '@midwayjs/typegoose';

import { uuid } from '../common/utils/strUtils';

@Provide()
export class MenuService extends BaseService {
  @InjectEntityModel(Menu)
  private menuModel: ReturnModelType<typeof Menu>;

  public async update(obj: Menu): Promise<any> {
    console.log(obj);

    if (!obj?.pid && !obj?.level && !obj?.parentId) {
      console.log('新增一级菜单');

      // 新增一级菜单

      obj.level = 1;

      obj.pid = uuid();

      await this?.menuModel?.create(obj);

      return obj;
    } else if (obj?.level === 1) {
      // 修改一级菜单

      console.log('修改一级菜单');
    } else if (obj?.parentId) {
      // 新增或修改二级菜单
      console.log('新增或修改二级菜单');

      if (!obj?.pid) {
        await this?.menuModel?.updateMany(
          { pid: obj?.parentId },
          { $push: { children: obj } }
        );
      } else {
        // TODO
        await this?.menuModel?.updateOne(
          { pid: obj?.parentId, children: { pid: obj?.pid } },
          { $set: { name: 'test' } }
        );
      }
    }
  }
 
  public async getById(pid: string, level: number): Promise<any> {
    if (level === 1) {
      const obj = await this?.menuModel?.findOne?.({ pid });
      return obj;
    }

    const list = await this?.menuModel?.find?.(
      { 'children.pid': pid },
      { 'children.$': 1 }
    );

    return list?.[0]?.children?.[0];
  }

  public async del(pid: string, level: number): Promise<void> {
    if (level === 1) {
      await this?.menuModel?.deleteOne({ pid });
      return;
    }
    await this?.menuModel?.updateMany({}, { $pull: { children: { pid } } });
  }

  public async init(): Promise<void> {
    // 初始化菜单

    const count = await this?.menuModel?.countDocuments();

    if (count > 2) {
      return;
    }

    const menus: any[] = [
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
            component:
              'userCenter/trade/promotion/seckill/seckillActivity/page',
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
    ]

    for (const  element of menus) {

      await this?.menuModel?.create(element as Menu)
    }
  }
}