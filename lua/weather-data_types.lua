-- Typed models for the WeatherData SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class History
---@field alerts? table
---@field core? table
---@field currently? table
---@field daily? table
---@field hourly? table

---@class HistoryListMatch
---@field end number
---@field lat number
---@field lon number
---@field start number

---@class Weather
---@field alerts? table
---@field core? table
---@field currently? table
---@field daily? table
---@field hourly? table

---@class WeatherListMatch
---@field lat number
---@field lon number

local M = {}

return M
