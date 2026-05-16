# WeatherData SDK configuration


def make_config():
    return {
        "main": {
            "name": "WeatherData",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api.weatherxu.com/v1",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "history": {},
                "weather": {},
            },
        },
        "entity": {
      "history": {
        "fields": [
          {
            "name": "alert",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "core",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "currently",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "daily",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "hourly",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 4,
          },
        ],
        "name": "history",
        "op": {
          "list": {
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                    {
                      "example": 40.7128,
                      "kind": "query",
                      "name": "lat",
                      "orig": "lat",
                      "reqd": True,
                      "type": "`$NUMBER`",
                      "active": True,
                    },
                    {
                      "example": -74.006,
                      "kind": "query",
                      "name": "lon",
                      "orig": "lon",
                      "reqd": True,
                      "type": "`$NUMBER`",
                      "active": True,
                    },
                    {
                      "example": 1704880800,
                      "kind": "query",
                      "name": "start",
                      "orig": "start",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/history",
                "parts": [
                  "history",
                ],
                "select": {
                  "exist": [
                    "end",
                    "lat",
                    "lon",
                    "start",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "weather": {
        "fields": [
          {
            "name": "alert",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "core",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 1,
          },
          {
            "name": "currently",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 2,
          },
          {
            "name": "daily",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 3,
          },
          {
            "name": "hourly",
            "req": False,
            "type": "`$ARRAY`",
            "active": True,
            "index$": 4,
          },
        ],
        "name": "weather",
        "op": {
          "list": {
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
                      "reqd": True,
                      "type": "`$NUMBER`",
                      "active": True,
                    },
                    {
                      "example": -74.006,
                      "kind": "query",
                      "name": "lon",
                      "orig": "lon",
                      "reqd": True,
                      "type": "`$NUMBER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/weather",
                "parts": [
                  "weather",
                ],
                "select": {
                  "exist": [
                    "lat",
                    "lon",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
