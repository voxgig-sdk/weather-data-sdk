
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'WeatherData',
        slug: "weather-data",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api.weatherxu.com/v1",

    auth: {
      prefix: '',
      name: 'X-API-KEY',
    },

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        history: {
        },
  
        weather: {
        },
  
    }
  }


  entity = {
    "history": {
      "fields": [
        {
          "name": "alerts",
          "short": "Historical weather alerts for the time period",
          "type": "`$ARRAY`"
        },
        {
          "name": "core",
          "short": "Core location and metadata information",
          "type": "`$OBJECT`"
        },
        {
          "name": "currently",
          "short": "Current weather conditions",
          "type": "`$OBJECT`"
        },
        {
          "name": "daily",
          "short": "Historical daily weather data",
          "type": "`$ARRAY`"
        },
        {
          "name": "hourly",
          "short": "Historical hourly weather data",
          "type": "`$ARRAY`"
        }
      ],
      "name": "history",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": 1704970800,
                    "kind": "query",
                    "name": "end",
                    "orig": "end",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  },
                  {
                    "example": 40.7128,
                    "kind": "query",
                    "name": "lat",
                    "orig": "lat",
                    "reqd": true,
                    "type": "`$NUMBER`"
                  },
                  {
                    "example": -74.006,
                    "kind": "query",
                    "name": "lon",
                    "orig": "lon",
                    "reqd": true,
                    "type": "`$NUMBER`"
                  },
                  {
                    "example": 1704880800,
                    "kind": "query",
                    "name": "start",
                    "orig": "start",
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/history",
              "segments": [
                {
                  "lit": "history"
                }
              ],
              "select": {
                "exist": [
                  "end",
                  "lat",
                  "lon",
                  "start"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "history"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "weather": {
      "fields": [
        {
          "name": "alerts",
          "short": "Weather alerts and warnings for the location",
          "type": "`$ARRAY`"
        },
        {
          "name": "core",
          "short": "Core location and metadata information",
          "type": "`$OBJECT`"
        },
        {
          "name": "currently",
          "short": "Current weather conditions",
          "type": "`$OBJECT`"
        },
        {
          "name": "daily",
          "short": "10-day daily weather forecast",
          "type": "`$ARRAY`"
        },
        {
          "name": "hourly",
          "short": "48-hour hourly weather forecast",
          "type": "`$ARRAY`"
        }
      ],
      "name": "weather",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "args": {
                "query": [
                  {
                    "example": 40.7128,
                    "kind": "query",
                    "name": "lat",
                    "orig": "lat",
                    "reqd": true,
                    "type": "`$NUMBER`"
                  },
                  {
                    "example": -74.006,
                    "kind": "query",
                    "name": "lon",
                    "orig": "lon",
                    "reqd": true,
                    "type": "`$NUMBER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/weather",
              "segments": [
                {
                  "lit": "weather"
                }
              ],
              "select": {
                "exist": [
                  "lat",
                  "lon"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "weather"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

