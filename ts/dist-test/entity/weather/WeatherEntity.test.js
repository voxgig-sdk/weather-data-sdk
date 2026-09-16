"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('WeatherEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when WEATHER_DATA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('WEATHER_DATA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.WeatherDataSDK.test();
        const ent = testsdk.Weather();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.WEATHER_DATA_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'weather.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "alerts", "req": false, "short": "Weather alerts and warnings for the location", "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "core", "req": false, "short": "Core location and metadata information", "type": "`$OBJECT`", "index$": 1 }, { "active": true, "name": "currently", "req": false, "short": "Current weather conditions", "type": "`$OBJECT`", "index$": 2 }, { "active": true, "name": "daily", "req": false, "short": "10-day daily weather forecast", "type": "`$ARRAY`", "index$": 3 }, { "active": true, "name": "hourly", "req": false, "short": "48-hour hourly weather forecast", "type": "`$ARRAY`", "index$": 4 }], "name": "weather", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "example": 40.7128, "kind": "query", "name": "lat", "orig": "lat", "reqd": true, "type": "`$NUMBER`", "index$": 0 }, { "active": true, "example": -74.006, "kind": "query", "name": "lon", "orig": "lon", "reqd": true, "type": "`$NUMBER`", "index$": 1 }] }, "contract": { "id": "GET /weather", "json": "{\"operationId\":\"getCurrentWeather\",\"parameters\":[{\"description\":\"Latitude coordinate of the location\",\"example\":40.7128,\"in\":\"query\",\"name\":\"lat\",\"required\":true,\"schema\":{\"format\":\"double\",\"maximum\":90,\"minimum\":-90,\"type\":\"number\"}},{\"description\":\"Longitude coordinate of the location\",\"example\":-74.006,\"in\":\"query\",\"name\":\"lon\",\"required\":true,\"schema\":{\"format\":\"double\",\"maximum\":180,\"minimum\":-180,\"type\":\"number\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Complete weather response including current conditions, hourly forecasts, and daily predictions\",\"properties\":{\"alerts\":{\"description\":\"Weather alerts and warnings for the location\",\"items\":{\"description\":\"Weather alert or warning information\",\"properties\":{\"description\":{\"description\":\"Detailed description of the alert\",\"type\":\"string\"},\"end\":{\"description\":\"Alert end time in Unix timestamp\",\"format\":\"int64\",\"type\":\"integer\"},\"event\":{\"description\":\"Alert event type\",\"type\":\"string\"},\"sender_name\":{\"description\":\"Name of the alerting agency\",\"type\":\"string\"},\"severity\":{\"description\":\"Alert severity level\",\"enum\":[\"minor\",\"moderate\",\"severe\",\"extreme\"],\"type\":\"string\"},\"start\":{\"description\":\"Alert start time in Unix timestamp\",\"format\":\"int64\",\"type\":\"integer\"}},\"type\":\"object\"},\"type\":\"array\"},\"core\":{\"description\":\"Core location and metadata information\",\"properties\":{\"lat\":{\"description\":\"Latitude of the location\",\"format\":\"double\",\"type\":\"number\"},\"lon\":{\"description\":\"Longitude of the location\",\"format\":\"double\",\"type\":\"number\"},\"timezone\":{\"description\":\"Timezone identifier\",\"type\":\"string\"},\"timezone_offset\":{\"description\":\"Timezone offset in seconds from UTC\",\"type\":\"integer\"}},\"type\":\"object\"},\"currently\":{\"description\":\"Current weather conditions\",\"properties\":{\"clouds\":{\"description\":\"Cloud coverage percentage\",\"format\":\"double\",\"type\":\"number\"},\"description\":{\"description\":\"Weather condition description\",\"type\":\"string\"},\"feels_like\":{\"description\":\"Apparent temperature\",\"format\":\"double\",\"type\":\"number\"},\"humidity\":{\"description\":\"Relative humidity percentage\",\"format\":\"double\",\"type\":\"number\"},\"icon\":{\"description\":\"Weather icon identifier\",\"type\":\"string\"},\"pressure\":{\"description\":\"Atmospheric pressure\",\"format\":\"double\",\"type\":\"number\"},\"temperature\":{\"description\":\"Current temperature\",\"format\":\"double\",\"type\":\"number\"},\"time\":{\"description\":\"Unix timestamp of the current observation\",\"format\":\"int64\",\"type\":\"integer\"},\"uv_index\":{\"description\":\"UV index\",\"format\":\"double\",\"type\":\"number\"},\"visibility\":{\"description\":\"Visibility distance\",\"format\":\"double\",\"type\":\"number\"},\"wind_direction\":{\"description\":\"Wind direction in degrees\",\"format\":\"double\",\"type\":\"number\"},\"wind_speed\":{\"description\":\"Wind speed\",\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"daily\":{\"description\":\"10-day daily weather forecast\",\"items\":{\"description\":\"Daily weather forecast data\",\"properties\":{\"clouds\":{\"description\":\"Cloud coverage percentage\",\"format\":\"double\",\"type\":\"number\"},\"description\":{\"description\":\"Weather condition description\",\"type\":\"string\"},\"feels_like\":{\"properties\":{\"day\":{\"description\":\"Day apparent temperature\",\"format\":\"double\",\"type\":\"number\"},\"evening\":{\"description\":\"Evening apparent temperature\",\"format\":\"double\",\"type\":\"number\"},\"morning\":{\"description\":\"Morning apparent temperature\",\"format\":\"double\",\"type\":\"number\"},\"night\":{\"description\":\"Night apparent temperature\",\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"humidity\":{\"description\":\"Average humidity percentage\",\"format\":\"double\",\"type\":\"number\"},\"icon\":{\"description\":\"Weather icon identifier\",\"type\":\"string\"},\"pop\":{\"description\":\"Probability of precipitation\",\"format\":\"double\",\"type\":\"number\"},\"precipitation\":{\"description\":\"Precipitation amount\",\"format\":\"double\",\"type\":\"number\"},\"pressure\":{\"description\":\"Atmospheric pressure\",\"format\":\"double\",\"type\":\"number\"},\"sunrise\":{\"description\":\"Sunrise time in Unix timestamp\",\"format\":\"int64\",\"type\":\"integer\"},\"sunset\":{\"description\":\"Sunset time in Unix timestamp\",\"format\":\"int64\",\"type\":\"integer\"},\"temperature\":{\"properties\":{\"day\":{\"description\":\"Day temperature\",\"format\":\"double\",\"type\":\"number\"},\"evening\":{\"description\":\"Evening temperature\",\"format\":\"double\",\"type\":\"number\"},\"max\":{\"description\":\"Maximum temperature for the day\",\"format\":\"double\",\"type\":\"number\"},\"min\":{\"description\":\"Minimum temperature for the day\",\"format\":\"double\",\"type\":\"number\"},\"morning\":{\"description\":\"Morning temperature\",\"format\":\"double\",\"type\":\"number\"},\"night\":{\"description\":\"Night temperature\",\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"time\":{\"description\":\"Unix timestamp for the forecast day\",\"format\":\"int64\",\"type\":\"integer\"},\"uv_index\":{\"description\":\"UV index\",\"format\":\"double\",\"type\":\"number\"},\"wind_direction\":{\"description\":\"Wind direction in degrees\",\"format\":\"double\",\"type\":\"number\"},\"wind_speed\":{\"description\":\"Wind speed\",\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"},\"hourly\":{\"description\":\"48-hour hourly weather forecast\",\"items\":{\"description\":\"Hourly weather forecast data\",\"properties\":{\"clouds\":{\"description\":\"Forecasted cloud coverage percentage\",\"format\":\"double\",\"type\":\"number\"},\"description\":{\"description\":\"Weather condition description\",\"type\":\"string\"},\"feels_like\":{\"description\":\"Forecasted apparent temperature\",\"format\":\"double\",\"type\":\"number\"},\"humidity\":{\"description\":\"Forecasted humidity percentage\",\"format\":\"double\",\"type\":\"number\"},\"icon\":{\"description\":\"Weather icon identifier\",\"type\":\"string\"},\"pop\":{\"description\":\"Probability of precipitation\",\"format\":\"double\",\"type\":\"number\"},\"precipitation\":{\"description\":\"Precipitation amount\",\"format\":\"double\",\"type\":\"number\"},\"pressure\":{\"description\":\"Forecasted atmospheric pressure\",\"format\":\"double\",\"type\":\"number\"},\"temperature\":{\"description\":\"Forecasted temperature\",\"format\":\"double\",\"type\":\"number\"},\"time\":{\"description\":\"Unix timestamp for the forecast hour\",\"format\":\"int64\",\"type\":\"integer\"},\"wind_direction\":{\"description\":\"Forecasted wind direction in degrees\",\"format\":\"double\",\"type\":\"number\"},\"wind_speed\":{\"description\":\"Forecasted wind speed\",\"format\":\"double\",\"type\":\"number\"}},\"type\":\"object\"},\"type\":\"array\"}},\"type\":\"object\"}}},\"description\":\"Successful response with weather data\"},\"400\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response object\",\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Bad request - Invalid parameters\"},\"401\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response object\",\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Unauthorized - Invalid or missing API key\"},\"429\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response object\",\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Too many requests - Rate limit exceeded\"},\"500\":{\"content\":{\"application/json\":{\"schema\":{\"description\":\"Error response object\",\"properties\":{\"error\":{\"properties\":{\"code\":{\"description\":\"Error code\",\"type\":\"string\"},\"message\":{\"description\":\"Human-readable error message\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Internal server error\"}},\"security\":[{\"ApiKeyAuth\":[]}],\"securitySchemes\":{\"ApiKeyAuth\":{\"description\":\"API key for authentication. Sign up at https://weatherxu.com to get your API key.\",\"in\":\"header\",\"name\":\"X-API-KEY\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/weather", "segments": [{ "lit": "weather" }], "select": { "exist": ["lat", "lon"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "weather", "name__orig": "weather", "Name": "Weather", "name_": "weather", "name-": "weather", "NAME": "WEATHER", "index$": 1 }, { "active": true, "entity": "weather", "key$": "BasicWeatherFlow", "kind": "basic", "name": "BasicWeatherFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "weather_ref01" } }], "index$": 0 }] }, 'Weather');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let weather_ref01_data = Object.values(setup.data.existing.weather)[0];
        // LIST
        const weather_ref01_ent = client.Weather();
        const weather_ref01_match = {};
        const weather_ref01_list = (await weather_ref01_ent.list(weather_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/weather/WeatherTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.WeatherDataSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['weather01', 'weather02', 'weather03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'WEATHER_DATA_TEST_WEATHER_ENTID': idmap,
        'WEATHER_DATA_TEST_LIVE': 'FALSE',
        'WEATHER_DATA_TEST_EXPLAIN': 'FALSE',
        'WEATHER_DATA_APIKEY': '',
    });
    idmap = env['WEATHER_DATA_TEST_WEATHER_ENTID'];
    const live = 'TRUE' === env.WEATHER_DATA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['WEATHER_DATA_TEST_WEATHER_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.WeatherDataSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.WEATHER_DATA_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.WEATHER_DATA_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=WeatherEntity.test.js.map