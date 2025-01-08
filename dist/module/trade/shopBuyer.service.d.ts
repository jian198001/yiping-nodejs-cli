import { BaseService } from "../common/service/base.service";
import { ReqParam } from "../common/model/ReqParam";
import { Page } from "../common/model/Page";
import { ShopBuyer } from "../../entity/ShopBuyer";
export declare class ShopBuyerService extends BaseService {
    private logger;
    static TABLE_NAME: string;
    private fromSql;
    private selectSql;
    private repository;
    private userService;
    private shopService;
    private log;
    /**
     * 分页查询店铺买家列表
     * @param parentShopBuyerId - 父级店铺买家ID
     * @param query - 查询字符串
     * @param params - 参数字符串
     * @param reqParam - 请求参数对象
     * @param page - 分页对象
     * @returns Promise<any> - 返回分页查询结果
     * @description 根据父级店铺买家ID、查询字符串、参数字符串、请求参数对象和分页对象，分页查询店铺买家列表，并返回符合条件的店铺买家信息
     */
    page(parentShopBuyerId: string, query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    /**
     * 根据ID查询店铺买家信息
     * @param id - 店铺买家ID
     * @returns Promise<any> - 返回查询到的店铺买家信息
     * @description 根据ID查询一条店铺买家数据，包括店铺买家的基本信息、关联的买家用户名、父级店铺买家代码、子级店铺买家数量、订单数量和分账数量
     */
    getById(id?: string): Promise<any>;
    /**
     * 根据店铺买家代码获取店铺买家信息
     * @param code - 店铺买家代码
     * @returns Promise<ShopBuyer> - 返回查询到的店铺买家信息
     * @description 根据店铺买家代码查询店铺买家信息，如果未找到则返回null
     */
    getByCode(code?: string): Promise<ShopBuyer>;
    /**
     * 删除指定ID的店铺买家
     * @param ids - 要删除的店铺买家ID数组
     * @returns Promise<void> - 无返回值
     * @description 根据提供的店铺买家ID数组，删除对应的店铺买家记录
     */
    del(ids: string[]): Promise<void>;
    /**
     * 更新店铺买家信息
     * @param obj - 店铺买家对象
     * @returns Promise<ShopBuyer> - 返回更新后的店铺买家对象
     * @description 根据提供的店铺买家对象，更新店铺买家信息，如果店铺买家不存在则新增，存在则修改
     */
    update(obj: ShopBuyer): Promise<ShopBuyer>;
    /**
     * 更新店铺买家的场景信息
     * @param scene - 新的场景信息
     * @param shopBuyerId - 店铺买家ID
     * @returns Promise<string> - 返回更新结果的状态码
     * @description 根据提供的场景信息和店铺买家ID，更新店铺买家的场景信息，如果场景信息已存在则返回相应状态码，否则更新场景信息并返回成功状态码
     */
    updateScene(scene: string, shopBuyerId: string): Promise<string>;
    /**
     * 获取店铺买家的二维码
     * @param shopId - 店铺ID
     * @param shopBuyerId - 店铺买家ID
     * @returns Promise<any> - 返回包含二维码信息的对象
     * @description 根据店铺ID和店铺买家ID生成或获取店铺买家的二维码，如果已生成则直接返回，否则生成新的二维码并保存
     */
    getQrcode(shopId: string, shopBuyerId: string): Promise<any>;
    /**
     * 根据店铺买家ID获取其父级店铺买家
     * @param shopBuyerId - 店铺买家ID
     * @returns Promise<any> - 返回查询到的父级店铺买家信息
     * @description 根据店铺买家ID查询其父级店铺买家，如果未找到则返回null
     */
    getParent(shopBuyerId?: string): Promise<any>;
    /**
     * 根据店铺买家ID获取其所有子级店铺买家
     * @param shopBuyerId - 店铺买家ID
     * @returns Promise<any[]> - 返回查询到的子级店铺买家列表
     * @description 根据店铺买家ID查询其所有子级店铺买家，如果未找到则返回空数组
     */
    getChildren(shopBuyerId?: string): Promise<any[]>;
    /**
     * 根据用户名和店铺ID查找店铺买家
     * @param username - 用户名
     * @param shopId - 店铺ID
     * @returns Promise<any> - 返回查询到的店铺买家信息
     * @description 根据用户名和店铺ID查询店铺买家信息，如果未找到则抛出异常
     */
    findByUsername(username: string, shopId: string): Promise<any>;
}
