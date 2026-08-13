# WeatherData SDK utility: make_context

from projectname_sdk.core.context import WeatherDataContext


def make_context_util(ctxmap, basectx):
    return WeatherDataContext(ctxmap, basectx)
