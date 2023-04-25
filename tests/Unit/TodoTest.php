<?php

namespace Tests\Unit;

use App\Events\TodoCreated;
use App\Models\Todo;
use App\Models\Section;
use App\Models\Project;
use App\Models\User;
use Tests\TestCase;
use Illuminate\Support\Facades\Event;

class TodoTest extends TestCase
{
    public function test_todo_created_event_is_dispatched(): void
    {
        Event::fake();
        $user = User::factory()->create();
        $project = Project::factory()->create(['user_id' => $user->id]);
        $section = Section::factory()->create(['project_id' => $project->id]);
        Todo::factory()->create(['project_id' => $project->id, 'section_id' => $section->id]);
        Event::assertDispatched(TodoCreated::class);
    }

}
