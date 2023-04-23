<?php

namespace Tests\Unit;

use App\Events\TodoCreated;
use App\Models\Todo;
use Tests\TestCase;
use Illuminate\Support\Facades\Event;

class TodoTest extends TestCase
{
    /**
     * A basic unit test example.
     */
    public function test_todo_created_event_is_dispatched(): void
    {
        Event::fake();
        $user = \App\Models\User::factory()->create();
        $project = \App\Models\Project::factory()->create(['user_id' => $user->id]);
        $section = \App\Models\Section::factory()->create(['project_id' => $project->id]);
        Todo::factory()->create(['project_id' => $project->id, 'section_id' => $section->id]);
        Event::assertDispatched(TodoCreated::class);
    }
}
