import { BaseService } from '../common/service/base.service';
import { Menu } from '../../model/Menu';
export declare class MenuService extends BaseService {
    private menuModel;
    update(obj: Menu): Promise<any>;
    getById(pid: string, level: number): Promise<any>;
    del(pid: string, level: number): Promise<void>;
    init(): Promise<void>;
}
