import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 文章实体类
 * 继承自BaseModel，包含文章相关的各种信息
 */
export declare class Article extends BaseModel {
    /**
     * 文章标题
     * 对应文章的标题
     */
    title: string;
    /**
     * 栏目ID
     * 对应文章所属栏目的唯一标识
     */
    categoryId: string;
    /**
     * 文章内容
     * 对应文章的详细内容
     */
    content: string;
}
