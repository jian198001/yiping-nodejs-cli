// 导入@midwayjs/swagger库中的ApiProperty装饰器，用于在Swagger文档中描述属性
// import {ApiProperty,} from "@midwayjs/swagger"
// 导入typeorm库中的Column和Entity装饰器，用于定义数据库实体和字段
import {Column, Entity,} from "typeorm"
// 导入BaseModel类，该类定义了实体的通用属性和方法
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 提现实体类
 * 继承自BaseModel，包含提现所需的各种信息
 */
@Entity()
export class Withdrawal extends BaseModel { // 提现

    /**
     * 用户ID
     * 对应提现的用户ID
     */
    @Column({ nullable: true, comment: '用户ID', name: 'shop_buyer_id' })
    public shopBuyerId: string; // 用户

    /**
     * 提现金额
     * 对应提现的金额
     */
    @Column({ nullable: true, comment: '提现金额' })
    public amount: number; // 提现金额

    /**
     * 商户订单号
     * 对应提现的商户订单号
     */
    @Column({nullable: true, comment: '商户订单号', name: 'out_trade_no',})
    public outTradeNo: string  
}
