import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 底部导航栏实体类
 * 继承自BaseModel，用于存储底部导航栏的相关信息
 */
export declare class Tabbar extends BaseModel {
    /**
     * 导航栏文本
     * 对应底部导航栏的显示文本
     */
    text: string;
    /**
     * 导航栏图标
     * 对应底部导航栏的显示图标
     */
    icon: string;
    /**
     * 导航栏链接
     * 对应底部导航栏点击后跳转的链接
     */
    url: string;
}
