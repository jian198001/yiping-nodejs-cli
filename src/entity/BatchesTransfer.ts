import { Column, Entity, } from "typeorm"
import { BaseModel, } from "../module/common/model/BaseModel";

/**
 * 商家转账明细列表实体类
 * 继承自BaseModel，包含商家转账相关的各种信息
 */
@Entity()
export class BatchesTransfer extends BaseModel {
    // 直连商户的appid，不传默认使用初始化数据
    @Column({ nullable: true, comment: '直连商户的appid -不传 默认使用初始化数据', })
    appid: string 
    
    // 商家批次单号
    @Column({ nullable: true, comment: '商家批次单号', name: 'out_batch_no', })
    outBatchNo: string 
    
    // 批次名称
    @Column({ nullable: true, comment: '批次名称', name: 'batch_name', })
    batchName: string 
    
    // 批次备注
    @Column({ nullable: true, comment: '批次备注', name: 'batch_remark', })
    batchRemark: string 
    
    // 转账总金额（元）
    @Column({ nullable: true, comment: '转账总金额(元)', name: 'total_amount', })
    totalAmount: number 
    
    // 转账总笔数
    @Column({ nullable: true, comment: '转账总笔数', name: 'total_num', })
    totalNum: number 
    
    // 转账场景ID
    @Column({ nullable: true, comment: '转账场景ID', name: 'transfer_scene_id', })
    transferSceneId: string 
    
    // 微信平台证书序列号-Wechatpay-Serial（当有敏感信息加密时，需要当前参数）
    @Column({ nullable: true, comment: '微信平台证书序列号-Wechatpay-Serial(当有敏感信息加密时,需要当前参数)', name: 'wx_serial_no', })
    wxSerialNo: string 
}
