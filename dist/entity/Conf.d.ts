import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 配置项实体类
 *
 * 该类用于定义系统配置项的基本信息，包括配置项的键、值、类别、类型、可见性和备注。
 * 所有标识符名称均来自支付宝。
 */
export declare class Conf extends BaseModel {
    /**
     * 配置项的键
     *
     * 用于唯一标识一个配置项。
     */
    confKey: string;
    /**
     * 配置项的值
     *
     * 配置项的具体取值。
     */
    confVal: string;
    /**
     * 配置项的类别
     *
     * 用于对配置项进行分类管理。
     */
    category: string;
    /**
     * 配置项的类型
     *
     * 用于标识配置项的数据类型。
     */
    type: string;
    /**
     * 配置项的可见性
     *
     * 用于控制配置项是否对用户可见。
     */
    visible: string;
    /**
     * 配置项的备注
     *
     * 用于对配置项进行说明和描述。
     */
    remark: string;
}
