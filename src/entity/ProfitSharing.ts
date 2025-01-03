import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 分账实体类
 * 用于表示分账的基本信息
 */
@Entity()
export class ProfitSharing extends BaseModel { // 标识符名称来自微信支付商户平台

  /**
   * 分账金额（元）
   * 分账的金额，单位为元，标识符名称来自微信支付商户平台
   */
  @Column({nullable: true, comment: '分账金额(元),标识符名称来自微信支付商户平台', })
  public amount: number  

  /**
   * 分账描述
   * 对分账的描述信息，标识符名称来自微信支付商户平台
   */
  @Column({nullable: true, comment: '分账描述,标识符名称来自微信支付商户平台',  })
  public description: string  

  /**
   * 分账接收方账号
   * 接收分账的账号，标识符名称来自微信支付商户平台
   */
  @Column({nullable: true, comment: '分账接收方账号,标识符名称来自微信支付商户平台', })
  public account: string  

}
