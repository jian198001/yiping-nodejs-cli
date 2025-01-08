import { BaseModel } from "../module/common/model/BaseModel";
/**
 * 商家转账明细列表实体类
 * 继承自BaseModel，包含商家转账相关的各种信息
 */
export declare class TransferDetailList extends BaseModel {
    appid: string;
    outBatchNo: string;
    batchName: string;
    batchRemark: string;
    totalAmount: number;
    totalNum: number;
    transferSceneId: string;
    wxSerialNo: string;
}
