package = "voxgig-sdk-weather-data"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/weather-data-sdk.git"
}
description = {
  summary = "WeatherData SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["weather-data_sdk"] = "weather-data_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
