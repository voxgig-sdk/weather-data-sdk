<?php
declare(strict_types=1);

// WeatherData SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class WeatherDataFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new WeatherDataBaseFeature();
            case "test":
                return new WeatherDataTestFeature();
            default:
                return new WeatherDataBaseFeature();
        }
    }
}
