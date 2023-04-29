<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\HtmlString;
use Tests\TestCase;

class LoginPageTest extends TestCase
{
    /**
     * There is a login page.
     */
    public function test_there_is_a_login_page(): void
    {
        $response = $this->get('/login');

        $response->assertStatus(200);

        // FIXME:
        $appName = config('app.name');
        // $response->assertSee(new HtmlString("Login to {$appName}"));
    }
}
