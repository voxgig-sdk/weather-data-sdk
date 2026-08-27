<?php
declare(strict_types=1);

// WeatherData SDK configuration

class WeatherDataConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "WeatherData",
                "slug" => "weather-data",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://api.weatherxu.com/v1",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "history" => [],
                    "weather" => [],
                ],
            ],
            "entity" => [
        'history' => [
          'fields' => [
            [
              'name' => 'alerts',
              'short' => 'Historical weather alerts for the time period',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'core',
              'short' => 'Core location and metadata information',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'currently',
              'short' => 'Current weather conditions',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'daily',
              'short' => 'Historical daily weather data',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'hourly',
              'short' => 'Historical hourly weather data',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'history',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 1704970800,
                        'kind' => 'query',
                        'name' => 'end',
                        'orig' => 'end',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'example' => 40.7128,
                        'kind' => 'query',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'reqd' => true,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => -74.006,
                        'kind' => 'query',
                        'name' => 'lon',
                        'orig' => 'lon',
                        'reqd' => true,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => 1704880800,
                        'kind' => 'query',
                        'name' => 'start',
                        'orig' => 'start',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/history',
                  'parts' => [
                    'history',
                  ],
                  'select' => [
                    'exist' => [
                      'end',
                      'lat',
                      'lon',
                      'start',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'weather' => [
          'fields' => [
            [
              'name' => 'alerts',
              'short' => 'Weather alerts and warnings for the location',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'core',
              'short' => 'Core location and metadata information',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'currently',
              'short' => 'Current weather conditions',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'daily',
              'short' => '10-day daily weather forecast',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'hourly',
              'short' => '48-hour hourly weather forecast',
              'type' => '`$ARRAY`',
            ],
          ],
          'name' => 'weather',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'example' => 40.7128,
                        'kind' => 'query',
                        'name' => 'lat',
                        'orig' => 'lat',
                        'reqd' => true,
                        'type' => '`$NUMBER`',
                      ],
                      [
                        'example' => -74.006,
                        'kind' => 'query',
                        'name' => 'lon',
                        'orig' => 'lon',
                        'reqd' => true,
                        'type' => '`$NUMBER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/weather',
                  'parts' => [
                    'weather',
                  ],
                  'select' => [
                    'exist' => [
                      'lat',
                      'lon',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return WeatherDataFeatures::make_feature($name);
    }
}
