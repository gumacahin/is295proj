<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Models\User;
use App\Events\UserCreated;
use Illuminate\Support\Facades\Event;

class UserTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_create_default_project_is_dispatched(): void
    {
        Event::fake();
        User::factory()->create();
        Event::assertDispatched(UserCreated::class);
    }
}
