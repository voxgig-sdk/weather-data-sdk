package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "WeatherData",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api.weatherxu.com/v1",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"history": map[string]any{},
				"weather": map[string]any{},
			},
		},
		"entity": map[string]any{
			"history": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "alerts",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "core",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "currently",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "daily",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "hourly",
						"type": "`$ARRAY`",
					},
				},
				"name": "history",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 1704970800,
											"kind": "query",
											"name": "end",
											"orig": "end",
											"reqd": true,
											"type": "`$INTEGER`",
										},
										map[string]any{
											"example": 40.7128,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": -74.006,
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": 1704880800,
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/history",
								"parts": []any{
									"history",
								},
								"select": map[string]any{
									"exist": []any{
										"end",
										"lat",
										"lon",
										"start",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"weather": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "alerts",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "core",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "currently",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "daily",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "hourly",
						"type": "`$ARRAY`",
					},
				},
				"name": "weather",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": 40.7128,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"reqd": true,
											"type": "`$NUMBER`",
										},
										map[string]any{
											"example": -74.006,
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"reqd": true,
											"type": "`$NUMBER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/weather",
								"parts": []any{
									"weather",
								},
								"select": map[string]any{
									"exist": []any{
										"lat",
										"lon",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
