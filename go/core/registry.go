package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewHistoryEntityFunc func(client *WeatherDataSDK, entopts map[string]any) WeatherDataEntity

var NewWeatherEntityFunc func(client *WeatherDataSDK, entopts map[string]any) WeatherDataEntity

