<?php

namespace Tests\Unit;

use Tests\TestCase;

use App\Models\Todo;
use App\Models\Section;
use App\Models\Project;
use Illuminate\Support\Facades\Event;

class ProjectTest extends TestCase
{
    public function test_it_returns_unsectioned_todos(): void
    {
        Event::fake();
        $project = Project::factory()->create();
        $section = Section::factory()->create(['project_id' => $project->id]);
        Todo::factory()
            ->create([
                'project_id' => $project->id,
                'section_id' => $section->id
            ]);
        $unsectionedTodo = Todo::factory()->create(['project_id' => $project->id]);

        $this->assertSame($project->todos->count(), 2);
        $this->assertSame($project->unsectionedTodos->count(), 1);
        $this->assertSame($project->unsectionedTodos->first()->id, $unsectionedTodo->id);
    }
}
