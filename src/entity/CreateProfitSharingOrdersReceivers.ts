import { Column, Entity, } from "typeorm"
import { BaseModel, } from "../module/common/model/BaseModel";

@Entity()
export class CreateProfitSharingOrdersReceivers extends BaseModel { // 所有标识符名称来自微信支付商户平台

    @Column({ nullable: true, comment: '分账接收方类型', })
    public type: 'MERCHANT_ID' | 'PERSONAL_OPENID' = 'PERSONAL_OPENID'
 
    @Column({ nullable: true, comment: '分账接收方账号', })
    public account: string 
 
    @Column({ nullable: true, comment: '分账个人接收方姓名', })
    public name: string 
 
    @Column({ nullable: true, comment: '分账金额(元)', })
    public amount: number 
 
    @Column({ nullable: true, comment: '分账描述', })
    public description: string 

}
