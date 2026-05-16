-- WeatherData SDK error

local WeatherDataError = {}
WeatherDataError.__index = WeatherDataError


function WeatherDataError.new(code, msg, ctx)
  local self = setmetatable({}, WeatherDataError)
  self.is_sdk_error = true
  self.sdk = "WeatherData"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function WeatherDataError:error()
  return self.msg
end


function WeatherDataError:__tostring()
  return self.msg
end


return WeatherDataError
