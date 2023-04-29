<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class TestSpecification extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sail:app:test:spec';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test application specification';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        exec('vendor/bin/phpspec run');
    }
}
