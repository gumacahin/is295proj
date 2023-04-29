<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class LoginPageTest extends TestCase
{
    /**
     * There is a login page.
     */
    public function test_there_is_a_login_page(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);

        $response->assertSee('<title>Login</title>');
        // $response->assertSee('DOCTYPE');
    }
}
