# WeatherData SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module WeatherDataFeatures
  def self.make_feature(name)
    case name
    when "base"
      WeatherDataBaseFeature.new
    when "ratelimit"
      WeatherDataRatelimitFeature.new
    when "retry"
      WeatherDataRetryFeature.new
    when "test"
      WeatherDataTestFeature.new
    when "timeout"
      WeatherDataTimeoutFeature.new
    else
      WeatherDataBaseFeature.new
    end
  end
end
