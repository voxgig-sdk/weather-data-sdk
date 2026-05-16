<?php
declare(strict_types=1);

// WeatherData SDK utility: result_headers

class WeatherDataResultHeaders
{
    public static function call(WeatherDataContext $ctx): ?WeatherDataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
