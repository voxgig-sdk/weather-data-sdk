import { Context } from './Context';
declare class WeatherDataError extends Error {
    isWeatherDataError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { WeatherDataError };
