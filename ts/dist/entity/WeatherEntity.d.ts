import { WeatherDataEntityBase } from '../WeatherDataEntityBase';
import type { WeatherDataSDK } from '../WeatherDataSDK';
import type { Control } from '../types';
import type { Weather, WeatherListMatch } from '../WeatherDataTypes';
declare class WeatherEntity extends WeatherDataEntityBase<Weather> {
    constructor(client: WeatherDataSDK, entopts: any);
    make(this: WeatherEntity): WeatherEntity;
    list(this: any, reqmatch?: WeatherListMatch, ctrl?: Control): Promise<WeatherEntity[]>;
}
export { WeatherEntity };
