import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 卡券基础信息实体类
 * 继承自BaseModel，包含卡券相关的各种基础信息
 */
export declare class CardBaseInfo extends BaseModel {
    /**
     * 商户名字
     * 卡券所属商户的名称，字数上限为12个汉字
     */
    brandName: string;
    /**
     * 是否指定用户领取
     * 是否限制特定用户领取卡券，true表示指定，false表示不指定，默认为false
     */
    bindBuyerId: string;
    /**
     * 是否分享给朋友
     * 卡券是否可以分享给朋友
     */
    shareFriends: string;
    /**
     * 使用时间的类型
     * 卡券的使用时间类型，可选值为DATE_TYPE_FIX_TIME_RANGE（固定日期区间）或DATE_TYPE_FIX_TERM（固定时长，自领取后按天算），默认为DATE_TYPE_FIX_TERM
     */
    type: string;
    /**
     * 购买xx可用类型门槛
     * 卡券使用的购买门槛说明，仅用于兑换券类型，填入后自动拼写购买xxx可用
     */
    objectUseFor: string;
    /**
     * 客服电话
     * 卡券所属商户的客服电话
     */
    servicePhone: string;
    /**
     * 指定不可用的商品类目
     * 卡券不可用的商品类目，仅用于代金券类型，填入后将在券面拼写不适用于xxxx
     */
    rejectCategory: string;
    /**
     * 起用时间
     * type为DATE_TYPE_FIX_TIME_RANGE时专用，表示卡券的起用时间，从1970年1月1日00:00:00至起用时间的秒数，最终需转换为字符串形态传入（东八区时间，UTC+8，单位为秒）
     */
    beginTimestamp: number;
    /**
     * 满减门槛字段
     * 卡券的满减门槛，可用于兑换券和代金券，填入后将在券面拼写消费满xx元可用
     */
    leastCost: number;
    /**
     * 码型
     * 卡券的码型，可选值为"CODE_TYPE_TEXT"（文本）、"CODE_TYPE_BARCODE"（一维码）、"CODE_TYPE_QRCODE"（二维码）、"CODE_TYPE_ONLY_QRCODE"（二维码无code显示）、"CODE_TYPE_ONLY_BARCODE"（一维码无code显示）、CODE_TYPE_NONE（不显示code和条形码类型），默认为"CODE_TYPE_QRCODE"
     */
    codeType: string;
    /**
     * 自领取后多少天内有效
     * type为DATE_TYPE_FIX_TERM时专用，表示卡券自领取后多少天内有效，不支持填写0
     */
    fixedTerm: number;
    /**
     * 是否可以与其他类型共享门槛
     * 卡券是否可以与其他类型共享门槛，false表示不可以，true表示可以，默认为true
     */
    canUseWithOtherDiscount: string;
    /**
     * 是否支付并生成二维码
     * 卡券是否需要支付并生成二维码
     */
    isPayAndQrcode: string;
    /**
     * 券颜色
     * 卡券的颜色，按色彩规范标注填写Color010-Color100
     */
    color: string;
    /**
     * 每人可领券的数量限制
     * 每人可领取该卡券的数量限制，不填写默认为50
     */
    getLimit: number;
    /**
     * 卡券使用说明
     * 卡券的使用说明，字数上限为1024个汉字
     */
    description: string;
    /**
     * 卡券领取页面是否可分享
     * 卡券领取页面是否可以分享
     */
    canShare: string;
    /**
     * 指定可用的商品类目
     * 卡券可用的商品类目，仅用于代金券类型，填入后将在券面拼写适用于xxx
     */
    acceptCategory: string;
    /**
     * 服务场景入口
     */
    customUrlName: string;
    /**
     * 门店位置poiid。 调用 POI门店管理接 口 获取门店位置poiid。具备线下门店 的商户为必填。
     */
    locationIdList: string;
    /**
     * 是否自定义Code码 。填写true或false,默认为false。 通常自有优惠码系统的开发者选择 自定义Code码,并在卡券投放时带入 Code码,详情见 是否自定义Code码 。
     */
    useCustomCode: string;
    /**
     * shop_id
     */
    shopId: string;
    /**
     * 设置本卡券支持全部门店,与location_id_list互斥
     */
    useAllLocations: string;
    /**
     * 表示结束时间 , 建议设置为截止日期的23:59:59过期 。 （ 东八区时间,UTC+8,单位为秒 ） // 可用于DATE_TYPE_FIX_TERM时间类型,表示卡券统一过期时间 , 建议设置为截止日期的23:59:59过期 。 （ 东八区时间,UTC+8,单位为秒 ）,设置了fixed_term卡券,当时间达到end_timestamp时卡券统一过期
     */
    endTimestamp: number;
    /**
     * 卡券是否可转赠。
     */
    canGiveFriend: string;
    /**
     * 卡券名,字数上限为9个汉字。(建议涵盖卡券属性、服务及金额(元))。
     */
    title: string;
    /**
     * 卡券使用提醒,字数上限为16个汉字。
     */
    notice: string;
    /**
     * 商家服务类型： BIZ_SERVICE_DELIVER 外卖服务； BIZ_SERVICE_FREE_PARK 停车位； BIZ_SERVICE_WITH_PET 可带宠物； BIZ_SERVICE_FREE_WIFI 免费wifi, 可多选
     */
    businessServiceList: string;
    /**
     * 服务场景入口
     */
    customUrl: string;
    /**
     * 显示在入口下方的提示语 ,仅在卡券状态正常(可以核销)时显示。
     */
    centerSubTitle: string;
    /**
     * type为DATE_TYPE_FIX_TERM时专用,表示自领取后多少天开始生效,领取后当天生效填写0。（单位为天）
     */
    fixedBeginTerm: number;
    /**
     * 每人可领券的数量限制,不填写默认为50。
     */
    useLimit: number;
}
