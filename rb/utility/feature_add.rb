# WeatherData SDK utility: feature_add
module WeatherDataUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
