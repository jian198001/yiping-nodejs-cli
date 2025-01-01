import {Column, Entity,} from "typeorm"
import {BaseModel,} from "../module/common/model/BaseModel";

/**
 * 转账明细列表实体类
 * 继承自BaseModel，用于存储转账明细的相关信息
 * 标识符名称来自微信支付商户平台
 */
@Entity()
export class TransferDetailList extends BaseModel { // 标识符名称来自微信支付商户平台,转账明细列表

  /**
   * 商家批次单号
   * 对应转账的商家批次单号
   */
  @Column({nullable: true, comment: '商家批次单号', name: 'out_batch_no',})
  public outBatchNo: string  

  /**
   * 商家明细单号
   * 对应转账的商家明细单号
   */
  @Column({nullable: true, comment: '商家明细单号', name: 'out_detail_no',})
  public outDetailNo: string  

  /**
   * 转账金额（元）
   * 对应转账的金额，单位为元
   */
  @Column({nullable: true, comment: '转账金额(元)', name: 'transfer_amount',})
  public transferAmount: number  

  /**
   * 转账备注
   * 对应转账的备注信息
   */
  @Column({nullable: true, comment: '转账备注', name: 'transfer_remark',})
  public transferRemark: string  

  /**
   * 用户在直连商户应用下的用户标示
   * 对应转账用户的唯一标识
   */
  @Column({nullable: true, comment: '用户在直连商户应用下的用户标示',})
  public openid: string  

  /**
   * 收款用户姓名
   * 对应收款用户的姓名
   */
  @Column({nullable: true, comment: '收款用户姓名', name: 'user_name',})
  public userName?: string  

}
