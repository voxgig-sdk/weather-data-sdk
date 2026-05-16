<?php
declare(strict_types=1);

// WeatherData SDK exists test

require_once __DIR__ . '/../weatherdata_sdk.php';

use PHPUnit\Framework\TestCase;

class ExistsTest extends TestCase
{
    public function test_create_test_sdk(): void
    {
        $testsdk = WeatherDataSDK::test(null, null);
        $this->assertNotNull($testsdk);
    }
}
