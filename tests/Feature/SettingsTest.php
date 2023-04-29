<?php

namespace Tests\Feature;

// use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SettingsTest extends TestCase
{
    /**
     * A basic test example.
     */
    public function test_application_name_is_what_should_i_do_today(): void
    {
        // $response = $this->get('/');

        // $response->assertStatus(200);
        $name = config('app.name');
        $this->assertSame($name, env('APP_NAME'));

    }
}
