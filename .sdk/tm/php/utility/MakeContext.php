<?php
declare(strict_types=1);

// WeatherData SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class WeatherDataMakeContext
{
    public static function call(array $ctxmap, ?WeatherDataContext $basectx): WeatherDataContext
    {
        return new WeatherDataContext($ctxmap, $basectx);
    }
}
