# ProjectName SDK exists test

import pytest
from weatherdata_sdk import WeatherDataSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = WeatherDataSDK.test(None, None)
        assert testsdk is not None
