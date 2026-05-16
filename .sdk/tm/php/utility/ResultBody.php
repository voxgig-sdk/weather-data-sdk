<?php
declare(strict_types=1);

// WeatherData SDK utility: result_body

class WeatherDataResultBody
{
    public static function call(WeatherDataContext $ctx): ?WeatherDataResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
