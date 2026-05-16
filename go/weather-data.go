package voxgigweatherdatasdk

import (
	"github.com/voxgig-sdk/weather-data-sdk/core"
	"github.com/voxgig-sdk/weather-data-sdk/entity"
	"github.com/voxgig-sdk/weather-data-sdk/feature"
	_ "github.com/voxgig-sdk/weather-data-sdk/utility"
)

// Type aliases preserve external API.
type WeatherDataSDK = core.WeatherDataSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type WeatherDataEntity = core.WeatherDataEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type WeatherDataError = core.WeatherDataError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewHistoryEntityFunc = func(client *core.WeatherDataSDK, entopts map[string]any) core.WeatherDataEntity {
		return entity.NewHistoryEntity(client, entopts)
	}
	core.NewWeatherEntityFunc = func(client *core.WeatherDataSDK, entopts map[string]any) core.WeatherDataEntity {
		return entity.NewWeatherEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewWeatherDataSDK = core.NewWeatherDataSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
