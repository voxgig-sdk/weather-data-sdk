
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'WeatherData',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
    },

  }


  options = {
    base: "https://api.weatherxu.com/v1",

    auth: {
      prefix: '',
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
          "type": "`$ARRAY`"
        },
        {
          "name": "core",
          "type": "`$OBJECT`"
        },
        {
          "name": "currently",
          "type": "`$OBJECT`"
        },
        {
          "name": "daily",
          "type": "`$ARRAY`"
        },
        {
          "name": "hourly",
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
              "parts": [
                "history"
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
              }
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
          "type": "`$ARRAY`"
        },
        {
          "name": "core",
          "type": "`$OBJECT`"
        },
        {
          "name": "currently",
          "type": "`$OBJECT`"
        },
        {
          "name": "daily",
          "type": "`$ARRAY`"
        },
        {
          "name": "hourly",
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
              "parts": [
                "weather"
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
              }
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
  config
}

