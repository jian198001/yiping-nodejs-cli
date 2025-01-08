/**
 * 员工用户中心区域控制器
 */
export declare class StaffWebUserCenterRegionRegionController {
    /**
     * 获取指定省份的城市列表
     *
     * @param province - 省份名称
     * @returns 返回城市列表
     */
    city(province: string): Promise<any>;
    /**
     * 获取所有地区列表
     *
     * @returns 返回地区列表
     */
    getById(): Promise<any>;
}
