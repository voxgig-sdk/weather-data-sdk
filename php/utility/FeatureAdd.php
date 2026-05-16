<?php
declare(strict_types=1);

// WeatherData SDK utility: feature_add

class WeatherDataFeatureAdd
{
    public static function call(WeatherDataContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
