import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 买家收货地址实体类
 * 继承自BaseModel，包含买家收货地址相关的各种信息
 */
export declare class BuyerReceiveAddress extends BaseModel {
    /**
     * 地区编码
     * 对应收货地址的地区编码
     */
    areaCode: string;
    /**
     * 手机号码
     * 对应收货地址的手机号码
     */
    phoneNum: string;
    /**
     * 买家ID
     * 对应收货地址所属买家的唯一标识
     */
    buyerId: string;
    /**
     * 真实姓名
     * 对应收货地址的真实姓名
     */
    trueName: string;
    /**
     * 城市
     * 对应收货地址的城市名称
     */
    city: string;
    /**
     * 区
     * 对应收货地址的区名称
     */
    region: string;
    /**
     * 省份/直辖市
     * 对应收货地址的省份或直辖市名称
     */
    province: string;
    /**
     * 邮政编码
     * 对应收货地址的邮政编码
     */
    postCode: string;
    /**
     * 是否为默认地址
     * 0表示不是，1表示是
     */
    defaultStatus: number;
    /**
     * 详细地址
     * 对应收货地址的详细街道及门牌号码
     */
    detailAddress: string;
}
