# Typed models for the WeatherData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class History:
    alert: Optional[list] = None
    core: Optional[dict] = None
    currently: Optional[dict] = None
    daily: Optional[list] = None
    hourly: Optional[list] = None


@dataclass
class HistoryListMatch:
    alert: Optional[list] = None
    core: Optional[dict] = None
    currently: Optional[dict] = None
    daily: Optional[list] = None
    hourly: Optional[list] = None


@dataclass
class Weather:
    alert: Optional[list] = None
    core: Optional[dict] = None
    currently: Optional[dict] = None
    daily: Optional[list] = None
    hourly: Optional[list] = None


@dataclass
class WeatherListMatch:
    alert: Optional[list] = None
    core: Optional[dict] = None
    currently: Optional[dict] = None
    daily: Optional[list] = None
    hourly: Optional[list] = None

