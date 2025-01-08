/**
 * 基础模型类，包含通用的字段和属性
 */
export declare abstract class BaseModel {
    /**
     * 主键，使用UUID生成
     */
    id: string;
    /**
     * 名称，可为空
     */
    name: string;
    /**
     * 排序字段，可为空，默认值为0
     */
    orderNum: number;
    /**
     * 创建日期，默认为当前日期
     */
    createDate: any;
    /**
     * 更新日期，默认为当前日期
     */
    updateDate: any;
    /**
     * 版本号，默认为0
     */
    version: number;
    /**
     * 删除日期，默认为空
     */
    deleteDate: any;
}
