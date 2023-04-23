<?php

namespace App\Listeners;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use App\Events\UserCreated;
use App\Models\Project;

class CreateDefaultProject
{
    /**
     * Create the event listener.
     */
    public function __construct()
    {
        //
    }

    /**
     * Handle the event.
     */
    public function handle(UserCreated $event): void
    {
        $project = new Project([
            'title' => 'Inbox',
            'is_default' => true,
        ]);

        $event->user->projects()->save($project);
    }
}
