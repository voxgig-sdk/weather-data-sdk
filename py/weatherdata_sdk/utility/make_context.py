# WeatherData SDK utility: make_context

from weatherdata_sdk.core.context import WeatherDataContext


def make_context_util(ctxmap, basectx):
    return WeatherDataContext(ctxmap, basectx)
