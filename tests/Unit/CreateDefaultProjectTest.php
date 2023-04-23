<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Listeners\CreateDefaultProject;
use App\Events\UserCreated;
use App\Models\User;
use App\Models\Project;

class CreateDefaultProjectTest extends TestCase
{
    public function setUp(): void
    {
        parent::setUp();
        User::unsetEventDispatcher();
    }

    public function test_it_creates_default_project(): void
    {
        $listener = new CreateDefaultProject();
        $user = User::factory()->create();

        $listener->handle(new UserCreated($user));

        $this->assertEquals($user->projects->count(), 0);
        $project = Project::where(['user_id' => $user->id])->first();
        $this->assertEquals($project->title, 'Inbox');
        $this->assertEquals($project->color, null);
        $this->assertEquals($project->is_default, true);
    }
}
