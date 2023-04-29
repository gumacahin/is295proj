<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

/*
 * Test the Welcome Page
 *
 * Welcome page is the landing page.
 */
class WelcomePageTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function test_there_is_a_home_page(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);

        $response->assertSee(env('APP_NAME'));
        $response->assertSee('Welcome');
        // $response->assertSee(env('OG_IMAGE_SOURCE'));
    }
}
