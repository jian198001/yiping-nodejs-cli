import {Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 标签实体类
 * 继承自BaseModel，用于存储标签的相关信息
 */
@Entity()
export class Tag extends BaseModel {
  // 这里可以添加具体的标签属性，例如标签名称、描述等

}
