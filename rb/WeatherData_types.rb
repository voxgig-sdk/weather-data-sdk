# frozen_string_literal: true

# Typed models for the WeatherData SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# History entity data model.
#
# @!attribute [rw] alert
#   @return [Array, nil]
#
# @!attribute [rw] core
#   @return [Hash, nil]
#
# @!attribute [rw] currently
#   @return [Hash, nil]
#
# @!attribute [rw] daily
#   @return [Array, nil]
#
# @!attribute [rw] hourly
#   @return [Array, nil]
History = Struct.new(
  :alert,
  :core,
  :currently,
  :daily,
  :hourly,
  keyword_init: true
)

# Request payload for History#list.
#
# @!attribute [rw] alert
#   @return [Array, nil]
#
# @!attribute [rw] core
#   @return [Hash, nil]
#
# @!attribute [rw] currently
#   @return [Hash, nil]
#
# @!attribute [rw] daily
#   @return [Array, nil]
#
# @!attribute [rw] hourly
#   @return [Array, nil]
HistoryListMatch = Struct.new(
  :alert,
  :core,
  :currently,
  :daily,
  :hourly,
  keyword_init: true
)

# Weather entity data model.
#
# @!attribute [rw] alert
#   @return [Array, nil]
#
# @!attribute [rw] core
#   @return [Hash, nil]
#
# @!attribute [rw] currently
#   @return [Hash, nil]
#
# @!attribute [rw] daily
#   @return [Array, nil]
#
# @!attribute [rw] hourly
#   @return [Array, nil]
Weather = Struct.new(
  :alert,
  :core,
  :currently,
  :daily,
  :hourly,
  keyword_init: true
)

# Request payload for Weather#list.
#
# @!attribute [rw] alert
#   @return [Array, nil]
#
# @!attribute [rw] core
#   @return [Hash, nil]
#
# @!attribute [rw] currently
#   @return [Hash, nil]
#
# @!attribute [rw] daily
#   @return [Array, nil]
#
# @!attribute [rw] hourly
#   @return [Array, nil]
WeatherListMatch = Struct.new(
  :alert,
  :core,
  :currently,
  :daily,
  :hourly,
  keyword_init: true
)

