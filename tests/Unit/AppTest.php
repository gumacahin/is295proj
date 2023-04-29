<?php

namespace Tests\Unit;

use Tests\TestCase;

class AppTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_app_exists(): void
    {
        $this->assertIsObject(app());
    }
}
