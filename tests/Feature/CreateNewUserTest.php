<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Project;
use App\Models\User;

class CreateNewUserTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    public function test_default_project_created_for_new_user(): void
    {
        $user = User::factory()->create();
        $this->assertEquals($user->projects->count(), 0);
        $project = Project::where(['user_id' => $user->id])->first();
        $this->assertEquals($project->title, 'Inbox');
        $this->assertEquals($project->is_default, true);
    }
}
