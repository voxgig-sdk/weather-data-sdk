# WeatherData SDK utility: make_context
require_relative '../core/context'
module WeatherDataUtilities
  MakeContext = ->(ctxmap, basectx) {
    WeatherDataContext.new(ctxmap, basectx)
  }
end
