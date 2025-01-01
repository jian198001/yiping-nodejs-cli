import { ApiProperty, } from "@midwayjs/swagger"
import { Column, Entity, } from "typeorm"
import { BaseModel, } from "../module/common/model/BaseModel";

/**
 * 库存实体类
 * 继承自BaseModel，用于存储库存相关的信息
 */
@Entity()
export class Stock extends BaseModel {

    /**
     * 物料ID
     * 对应库存物料的唯一标识
     */
    @Column({ nullable: true, comment: '', name: 'material_id', })
    public materialId: string 

    /**
     * 库存单位
     * 对应库存物料的库存单位
     */
    @Column({ nullable: true, comment: '', name: 'sku', })
    public sku: string 

    /**
     * 库存数量
     * 对应库存物料的数量，标识符名称来自支付宝
     */
    @Column({ nullable: true, comment: '', type: 'double', })
    @ApiProperty({ description: '库存数量,标识符名称来自支付宝', })
    public quantity: number = 1

    /**
     * 失效日期
     * 对应库存物料的失效日期
     */
    @Column({nullable: true, type: 'datetime',})
    @ApiProperty({ description: '失效日期', type: 'datetime', })
    public exp: any = null

}
