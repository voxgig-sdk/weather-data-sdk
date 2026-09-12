import { WeatherDataEntityBase } from '../WeatherDataEntityBase';
import type { WeatherDataSDK } from '../WeatherDataSDK';
import type { Control } from '../types';
import type { History, HistoryListMatch } from '../WeatherDataTypes';
declare class HistoryEntity extends WeatherDataEntityBase<History> {
    constructor(client: WeatherDataSDK, entopts: any);
    make(this: HistoryEntity): HistoryEntity;
    list(this: any, reqmatch?: HistoryListMatch, ctrl?: Control): Promise<HistoryEntity[]>;
}
export { HistoryEntity };
