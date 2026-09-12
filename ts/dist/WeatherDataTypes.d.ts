export interface History {
    alerts?: any[];
    core?: Record<string, any>;
    currently?: Record<string, any>;
    daily?: any[];
    hourly?: any[];
}
export interface HistoryListMatch {
    end: number;
    lat: number;
    lon: number;
    start: number;
}
export interface Weather {
    alerts?: any[];
    core?: Record<string, any>;
    currently?: Record<string, any>;
    daily?: any[];
    hourly?: any[];
}
export interface WeatherListMatch {
    lat: number;
    lon: number;
}
