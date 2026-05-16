<?php
declare(strict_types=1);

// WeatherData SDK utility: prepare_body

class WeatherDataPrepareBody
{
    public static function call(WeatherDataContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
