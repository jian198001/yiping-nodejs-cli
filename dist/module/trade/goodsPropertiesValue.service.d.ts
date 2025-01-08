import { BaseService } from '../common/service/base.service';
import { ReqParam } from '../common/model/ReqParam';
import { Page } from '../common/model/Page';
import { GoodsPropertiesValue } from '../../entity/GoodsPropertiesValue';
export declare class GoodsPropertiesValueService extends BaseService {
    private logger;
    private static TABLE_NAME;
    private fromSql;
    private selectSql;
    private repository;
    page(query: string, params: string, reqParam: ReqParam, page: Page): Promise<any>;
    private getToRedis;
    getById(id?: string): Promise<any>;
    del(ids: string[]): Promise<void>;
    update(obj: GoodsPropertiesValue): Promise<GoodsPropertiesValue>;
}
