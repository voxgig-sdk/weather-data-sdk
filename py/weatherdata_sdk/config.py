# WeatherData SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "WeatherData",
            "slug": "weather-data",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
      },
        },
        "options": {
            "base": "https://api.weatherxu.com/v1",
            "auth": {
                "prefix": "",
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
            "name": "alerts",
            "short": "Historical weather alerts for the time period",
            "type": "`$ARRAY`",
          },
          {
            "name": "core",
            "short": "Core location and metadata information",
            "type": "`$OBJECT`",
          },
          {
            "name": "currently",
            "short": "Current weather conditions",
            "type": "`$OBJECT`",
          },
          {
            "name": "daily",
            "short": "Historical daily weather data",
            "type": "`$ARRAY`",
          },
          {
            "name": "hourly",
            "short": "Historical hourly weather data",
            "type": "`$ARRAY`",
          },
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
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                    {
                      "example": 40.7128,
                      "kind": "query",
                      "name": "lat",
                      "orig": "lat",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": -74.006,
                      "kind": "query",
                      "name": "lon",
                      "orig": "lon",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": 1704880800,
                      "kind": "query",
                      "name": "start",
                      "orig": "start",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "weather": {
        "fields": [
          {
            "name": "alerts",
            "short": "Weather alerts and warnings for the location",
            "type": "`$ARRAY`",
          },
          {
            "name": "core",
            "short": "Core location and metadata information",
            "type": "`$OBJECT`",
          },
          {
            "name": "currently",
            "short": "Current weather conditions",
            "type": "`$OBJECT`",
          },
          {
            "name": "daily",
            "short": "10-day daily weather forecast",
            "type": "`$ARRAY`",
          },
          {
            "name": "hourly",
            "short": "48-hour hourly weather forecast",
            "type": "`$ARRAY`",
          },
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
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                    {
                      "example": -74.006,
                      "kind": "query",
                      "name": "lon",
                      "orig": "lon",
                      "reqd": True,
                      "type": "`$NUMBER`",
                    },
                  ],
                },
                "kind": "http",
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
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
