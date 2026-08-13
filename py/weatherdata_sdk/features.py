# WeatherData SDK feature factory

from weatherdata_sdk.feature.base_feature import WeatherDataBaseFeature
from weatherdata_sdk.feature.test_feature import WeatherDataTestFeature


def _make_feature(name):
    features = {
        "base": lambda: WeatherDataBaseFeature(),
        "test": lambda: WeatherDataTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
