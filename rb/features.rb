# WeatherData SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module WeatherDataFeatures
  def self.make_feature(name)
    case name
    when "base"
      WeatherDataBaseFeature.new
    when "test"
      WeatherDataTestFeature.new
    else
      WeatherDataBaseFeature.new
    end
  end
end
