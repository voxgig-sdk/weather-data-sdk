-- WeatherData SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "WeatherData",
      slug = "weather-data",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["transport"] = "base",
      },
    },
    options = {
      base = "https://api.weatherxu.com/v1",
      auth = {
        prefix = "",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["history"] = {},
        ["weather"] = {},
      },
    },
    entity = {
      ["history"] = {
        ["fields"] = {
          {
            ["name"] = "alerts",
            ["short"] = "Historical weather alerts for the time period",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "core",
            ["short"] = "Core location and metadata information",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "currently",
            ["short"] = "Current weather conditions",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "daily",
            ["short"] = "Historical daily weather data",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "hourly",
            ["short"] = "Historical hourly weather data",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "history",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 1704970800,
                      ["kind"] = "query",
                      ["name"] = "end",
                      ["orig"] = "end",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                    {
                      ["example"] = 40.7128,
                      ["kind"] = "query",
                      ["name"] = "lat",
                      ["orig"] = "lat",
                      ["reqd"] = true,
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["example"] = -74.006,
                      ["kind"] = "query",
                      ["name"] = "lon",
                      ["orig"] = "lon",
                      ["reqd"] = true,
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["example"] = 1704880800,
                      ["kind"] = "query",
                      ["name"] = "start",
                      ["orig"] = "start",
                      ["reqd"] = true,
                      ["type"] = "`$INTEGER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/history",
                ["parts"] = {
                  "history",
                },
                ["select"] = {
                  ["exist"] = {
                    "end",
                    "lat",
                    "lon",
                    "start",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["weather"] = {
        ["fields"] = {
          {
            ["name"] = "alerts",
            ["short"] = "Weather alerts and warnings for the location",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "core",
            ["short"] = "Core location and metadata information",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "currently",
            ["short"] = "Current weather conditions",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "daily",
            ["short"] = "10-day daily weather forecast",
            ["type"] = "`$ARRAY`",
          },
          {
            ["name"] = "hourly",
            ["short"] = "48-hour hourly weather forecast",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "weather",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["args"] = {
                  ["query"] = {
                    {
                      ["example"] = 40.7128,
                      ["kind"] = "query",
                      ["name"] = "lat",
                      ["orig"] = "lat",
                      ["reqd"] = true,
                      ["type"] = "`$NUMBER`",
                    },
                    {
                      ["example"] = -74.006,
                      ["kind"] = "query",
                      ["name"] = "lon",
                      ["orig"] = "lon",
                      ["reqd"] = true,
                      ["type"] = "`$NUMBER`",
                    },
                  },
                },
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/weather",
                ["parts"] = {
                  "weather",
                },
                ["select"] = {
                  ["exist"] = {
                    "lat",
                    "lon",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
