# WeatherData SDK

Global current, hourly, daily, and historical weather data via a simple JSON REST API

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Weather Data API

[WeatherXu](https://weatherxu.com) is a commercial weather data service that exposes global forecast and historical observations through a JSON-based REST API hosted at `https://api.weatherxu.com/v1`.

What you get from the API:

- Current conditions for a `lat`/`lon` point
- Hourly forecast (up to 48 hours)
- Daily forecast (up to 10 days)
- Weather alerts
- Historical weather lookups by Unix timestamp range (`start`, `end`)

Requests are authenticated with an API key passed as the `X-API-KEY` header. Per WeatherXu's documentation, the free plan permits roughly 10 requests per second while paid plans go up to about 500 requests per second. Units and field-level details are described under the documentation's `/documentation/units` section.

## Try it

**TypeScript**
```bash
npm install weather-data
```

**Python**
```bash
pip install weather-data-sdk
```

**PHP**
```bash
composer require voxgig/weather-data-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/weather-data-sdk/go
```

**Ruby**
```bash
gem install weather-data-sdk
```

**Lua**
```bash
luarocks install weather-data-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { WeatherDataSDK } from 'weather-data'

const client = new WeatherDataSDK({})

// List all historys
const historys = await client.History().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o weather-data-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "weather-data": {
      "command": "/abs/path/to/weather-data-mcp"
    }
  }
}
```

## Entities

The API exposes 2 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **History** | Historical weather observations for a coordinate over a Unix-timestamp range, served from `https://historical.weatherxu.com/v1/history` with `lat`, `lon`, `start`, and `end` parameters. | `/history` |
| **Weather** | Current conditions plus hourly (48h) and daily (10d) forecasts and alerts for a coordinate, served from `/v1/weather` with `lat` and `lon` parameters. | `/weather` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from weatherdata_sdk import WeatherDataSDK

client = WeatherDataSDK({})

# List all historys
historys, err = client.History(None).list(None, None)
```

### PHP

```php
<?php
require_once 'weatherdata_sdk.php';

$client = new WeatherDataSDK([]);

// List all historys
[$historys, $err] = $client->History(null)->list(null, null);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/weather-data-sdk/go"

client := sdk.NewWeatherDataSDK(map[string]any{})

// List all historys
historys, err := client.History(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "WeatherData_sdk"

client = WeatherDataSDK.new({})

# List all historys
historys, err = client.History(nil).list(nil, nil)
```

### Lua

```lua
local sdk = require("weather-data_sdk")

local client = sdk.new({})

-- List all historys
local historys, err = client:History(nil):list(nil, nil)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = WeatherDataSDK.test()
const result = await client.History().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = WeatherDataSDK.test(None, None)
result, err = client.History(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = WeatherDataSDK::test(null, null);
[$result, $err] = $client->History(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.History(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = WeatherDataSDK.test(nil, nil)
result, err = client.History(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:History(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Weather Data API

- Upstream: [https://weatherxu.com](https://weatherxu.com)
- API docs: [https://weatherxu.com/documentation](https://weatherxu.com/documentation)

- Commercial API operated by WeatherXu; see the [Terms](https://weatherxu.com/terms) and [Privacy Policy](https://weatherxu.com/privacy).
- Free and paid plans are offered, distinguished by rate limits.
- Requires an API key (`X-API-KEY` header) issued by WeatherXu.
- Note: community trackers have flagged availability issues in the past; verify uptime before relying on it in production.

---

Generated from the Weather Data API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
