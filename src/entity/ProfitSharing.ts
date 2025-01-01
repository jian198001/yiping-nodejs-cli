import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

@Entity()
export class ProfitSharing extends BaseModel { // 标识符名称来自微信支付商户平台

  @Column({nullable: true, comment: '分账金额(元),标识符名称来自微信支付商户平台', })
  public amount: number  

  @Column({nullable: true, comment: '分账描述,标识符名称来自微信支付商户平台',  })
  public description: string  

  @Column({nullable: true, comment: '分账接收方账号,标识符名称来自微信支付商户平台', })
  public account: string  

}
