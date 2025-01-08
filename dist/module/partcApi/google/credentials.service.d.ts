import { BaseService } from '../../common/service/base.service';
import { GoogleCredentials } from '../../../entity/GoogleCredentials';
export declare class CredentialsService extends BaseService {
    private static TABLE_NAME;
    private repository;
    /**
     * 更新或插入Google凭据
     * @param obj - 包含Google凭据信息的对象
     * @returns 更新或插入后的Google凭据对象，如果是插入操作则返回null
     */
    update(obj: GoogleCredentials): Promise<GoogleCredentials>;
}
