import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 店铺买家实体类
 * 继承自BaseModel，包含店铺买家相关的各种信息
 */
export declare class ShopBuyer extends BaseModel {
    /**
     * 余额
     * 对应店铺买家的账户余额
     */
    balance: number;
    /**
     * 积分
     * 对应店铺买家的积分
     */
    bonus: number;
    /**
     * 保证金-解冻
     * 对应店铺买家已解冻的保证金金额
     */
    freezeAmountFree: number;
    /**
     * 会员卡号
     * 对应店铺买家的会员卡号
     */
    code: string;
    /**
     * 店铺ID
     * 对应店铺买家所属店铺的唯一标识
     */
    shopId: string;
    /**
     * 买家ID
     * 对应店铺买家的唯一标识
     */
    buyerId: string;
    /**
     * 保证金-已冻结
     * 对应店铺买家已冻结的保证金金额
     */
    freezeAmountFreezing: number;
    /**
     * 场景
     * 对应店铺买家的场景信息
     */
    scene: string;
    /**
     * 卖家来控制买家自己是否可以修改自己的相关信息
     * 卖家控制买家是否可以修改自己的相关信息，默认为'0'
     */
    readonly: string;
    /**
     * 用户角色
     * 对应店铺买家的用户角色
     */
    userRole: string;
    /**
     * 小程序分销转介绍场景二维码
     * 对应小程序分销转介绍场景的二维码图片链接
     */
    img: string;
    /**
     * 转介绍人id
     * 对应店铺买家的转介绍人的唯一标识
     */
    parentId: string;
}
