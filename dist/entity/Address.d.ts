import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 地址实体类
 * 继承自BaseModel，包含商家地址相关的各种信息
 */
export declare class Address extends BaseModel {
    /**
     * 是否为发货地址
     * 1表示是，0表示否
     */
    sendAddr: string;
    /**
     * 是否为默认发货地址
     * 1表示是，0表示否
     */
    defaultSend: string;
    /**
     * 是否为收货地址
     * 1表示是，0表示否
     */
    recvAddr: string;
    /**
     * 是否为默认收货地址
     * 1表示是，0表示否
     */
    defaultRecv: string;
    /**
     * 是否为同城配送地址
     * 1表示是，0表示否
     */
    sameCity: string;
    /**
     * 是否为线下自提地址
     * 1表示是，0表示否
     */
    pickup: string;
    /**
     * 经度
     */
    lat: string;
    /**
     * 纬度
     */
    lng: string;
    /**
     * 地区编码
     */
    areaCode: string;
    /**
     * 电话号码
     */
    phoneNum: string;
    /**
     * 店铺ID
     */
    shopId: string;
    /**
     * 真实姓名
     */
    trueName: string;
    /**
     * 城市
     */
    city: string;
    /**
     * 区
     */
    region: string;
    /**
     * 省份/直辖市
     */
    province: string;
    /**
     * 邮政编码
     */
    postCode: string;
    /**
     * 是否为默认地址
     * 1表示是，0表示否
     */
    defaultStatus: number;
    /**
     * 详细地址（街道）
     */
    detailAddress: string;
}
