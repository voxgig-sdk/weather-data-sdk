// Typed models for the WeatherData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface History {
  alerts?: any[]
  core?: Record<string, any>
  currently?: Record<string, any>
  daily?: any[]
  hourly?: any[]
}

export interface HistoryListMatch {
  alerts?: any[]
  core?: Record<string, any>
  currently?: Record<string, any>
  daily?: any[]
  hourly?: any[]
}

export interface Weather {
  alerts?: any[]
  core?: Record<string, any>
  currently?: Record<string, any>
  daily?: any[]
  hourly?: any[]
}

export interface WeatherListMatch {
  alerts?: any[]
  core?: Record<string, any>
  currently?: Record<string, any>
  daily?: any[]
  hourly?: any[]
}

