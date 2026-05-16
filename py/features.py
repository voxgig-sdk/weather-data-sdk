# WeatherData SDK feature factory

from feature.base_feature import WeatherDataBaseFeature
from feature.test_feature import WeatherDataTestFeature


def _make_feature(name):
    features = {
        "base": lambda: WeatherDataBaseFeature(),
        "test": lambda: WeatherDataTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
