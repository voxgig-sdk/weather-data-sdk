import { HistoryEntity } from './entity/HistoryEntity';
import { WeatherEntity } from './entity/WeatherEntity';
export type * from './WeatherDataTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { WeatherDataEntityBase } from './WeatherDataEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class WeatherDataSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    History(entopts?: Record<string, any>): HistoryEntity;
    Weather(entopts?: Record<string, any>): WeatherEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): WeatherDataSDK;
    tester(testopts?: any, sdkopts?: any): WeatherDataSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof WeatherDataSDK;
export { stdutil, config, BaseFeature, WeatherDataEntityBase, WeatherDataSDK, SDK, };
