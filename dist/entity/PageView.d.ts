import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 页面浏览实体类
 * 用于记录页面浏览信息
 */
export declare class PageView extends BaseModel {
    /**
     * 店铺ID
     * 浏览页面的店铺ID
     */
    shopId: string;
    /**
     * 用户ID
     * 浏览页面的用户ID
     */
    userId: string;
    /**
     * 用户角色
     * 浏览页面的用户角色
     */
    userRole: string;
    /**
     * 页面名称
     * 被浏览的页面名称
     */
    page: string;
}
