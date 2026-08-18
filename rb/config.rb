# WeatherData SDK configuration

module WeatherDataConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
  def self.make_config
    {
      "main" => {
        "name" => "WeatherData",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://api.weatherxu.com/v1",
        "auth" => {
          "prefix" => "",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "history" => {},
          "weather" => {},
        },
      },
      "entity" => {
        "history" => {
          "fields" => [
            {
              "name" => "alerts",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "core",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "currently",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "daily",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "hourly",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "history",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 1704970800,
                        "kind" => "query",
                        "name" => "end",
                        "orig" => "end",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "example" => 40.7128,
                        "kind" => "query",
                        "name" => "lat",
                        "orig" => "lat",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                      },
                      {
                        "example" => -74.006,
                        "kind" => "query",
                        "name" => "lon",
                        "orig" => "lon",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                      },
                      {
                        "example" => 1704880800,
                        "kind" => "query",
                        "name" => "start",
                        "orig" => "start",
                        "reqd" => true,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/history",
                  "parts" => [
                    "history",
                  ],
                  "select" => {
                    "exist" => [
                      "end",
                      "lat",
                      "lon",
                      "start",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "weather" => {
          "fields" => [
            {
              "name" => "alerts",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "core",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "currently",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "daily",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "hourly",
              "type" => "`$ARRAY`",
            },
          ],
          "name" => "weather",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "example" => 40.7128,
                        "kind" => "query",
                        "name" => "lat",
                        "orig" => "lat",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                      },
                      {
                        "example" => -74.006,
                        "kind" => "query",
                        "name" => "lon",
                        "orig" => "lon",
                        "reqd" => true,
                        "type" => "`$NUMBER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/weather",
                  "parts" => [
                    "weather",
                  ],
                  "select" => {
                    "exist" => [
                      "lat",
                      "lon",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    WeatherDataFeatures.make_feature(name)
  end
end
