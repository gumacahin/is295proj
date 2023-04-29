namespace App\Console\Commands;

use Illuminate\Console\Command;

class InstallApp extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:install';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Install the application.';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        if ($this->confirm('Are you sure you want to install the application? This will wipe all data and install fresh database schema.')) {

            if ($this->confirm('Do you want to make a backup of the site first?')) {
                // code to make backup
            }

            // code to run installation

            $this->info('Application installed successfully!');
        } else {
            $this->info('Installation aborted.');
        }
    }
}
