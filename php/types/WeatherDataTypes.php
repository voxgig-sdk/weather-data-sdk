<?php
declare(strict_types=1);

// Typed models for the WeatherData SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** History entity data model. */
class History
{
    public ?array $alert = null;
    public ?array $core = null;
    public ?array $currently = null;
    public ?array $daily = null;
    public ?array $hourly = null;
}

/** Match filter for History#list (any subset of History fields). */
class HistoryListMatch
{
    public ?array $alert = null;
    public ?array $core = null;
    public ?array $currently = null;
    public ?array $daily = null;
    public ?array $hourly = null;
}

/** Weather entity data model. */
class Weather
{
    public ?array $alert = null;
    public ?array $core = null;
    public ?array $currently = null;
    public ?array $daily = null;
    public ?array $hourly = null;
}

/** Match filter for Weather#list (any subset of Weather fields). */
class WeatherListMatch
{
    public ?array $alert = null;
    public ?array $core = null;
    public ?array $currently = null;
    public ?array $daily = null;
    public ?array $hourly = null;
}

