package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewHistoryEntityFunc func(client *WeatherDataSDK, entopts map[string]any) WeatherDataEntity

var NewWeatherEntityFunc func(client *WeatherDataSDK, entopts map[string]any) WeatherDataEntity

