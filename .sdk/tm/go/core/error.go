package core

type WeatherDataError struct {
	IsWeatherDataError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewWeatherDataError(code string, msg string, ctx *Context) *WeatherDataError {
	return &WeatherDataError{
		IsWeatherDataError: true,
		Sdk:              "WeatherData",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *WeatherDataError) Error() string {
	return e.Msg
}
