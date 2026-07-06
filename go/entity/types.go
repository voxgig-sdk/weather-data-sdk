// Typed models for the WeatherData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// History is the typed data model for the history entity.
type History struct {
	Alert *[]any `json:"alert,omitempty"`
	Core *map[string]any `json:"core,omitempty"`
	Currently *map[string]any `json:"currently,omitempty"`
	Daily *[]any `json:"daily,omitempty"`
	Hourly *[]any `json:"hourly,omitempty"`
}

// HistoryListMatch is the typed request payload for History.ListTyped.
type HistoryListMatch struct {
	Alert *[]any `json:"alert,omitempty"`
	Core *map[string]any `json:"core,omitempty"`
	Currently *map[string]any `json:"currently,omitempty"`
	Daily *[]any `json:"daily,omitempty"`
	Hourly *[]any `json:"hourly,omitempty"`
}

// Weather is the typed data model for the weather entity.
type Weather struct {
	Alert *[]any `json:"alert,omitempty"`
	Core *map[string]any `json:"core,omitempty"`
	Currently *map[string]any `json:"currently,omitempty"`
	Daily *[]any `json:"daily,omitempty"`
	Hourly *[]any `json:"hourly,omitempty"`
}

// WeatherListMatch is the typed request payload for Weather.ListTyped.
type WeatherListMatch struct {
	Alert *[]any `json:"alert,omitempty"`
	Core *map[string]any `json:"core,omitempty"`
	Currently *map[string]any `json:"currently,omitempty"`
	Daily *[]any `json:"daily,omitempty"`
	Hourly *[]any `json:"hourly,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
