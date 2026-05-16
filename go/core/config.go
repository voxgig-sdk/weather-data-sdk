package core

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
				"prefix": "Bearer",
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
						"name": "alert",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "core",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "currently",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "daily",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "hourly",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 4,
					},
				},
				"name": "history",
				"op": map[string]any{
					"list": map[string]any{
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
											"active": true,
										},
										map[string]any{
											"example": 40.7128,
											"kind": "query",
											"name": "lat",
											"orig": "lat",
											"reqd": true,
											"type": "`$NUMBER`",
											"active": true,
										},
										map[string]any{
											"example": -74.006,
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"reqd": true,
											"type": "`$NUMBER`",
											"active": true,
										},
										map[string]any{
											"example": 1704880800,
											"kind": "query",
											"name": "start",
											"orig": "start",
											"reqd": true,
											"type": "`$INTEGER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"weather": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "alert",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "core",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 1,
					},
					map[string]any{
						"name": "currently",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 2,
					},
					map[string]any{
						"name": "daily",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 3,
					},
					map[string]any{
						"name": "hourly",
						"req": false,
						"type": "`$ARRAY`",
						"active": true,
						"index$": 4,
					},
				},
				"name": "weather",
				"op": map[string]any{
					"list": map[string]any{
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
											"active": true,
										},
										map[string]any{
											"example": -74.006,
											"kind": "query",
											"name": "lon",
											"orig": "lon",
											"reqd": true,
											"type": "`$NUMBER`",
											"active": true,
										},
									},
								},
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
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
