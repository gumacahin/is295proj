<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Auth;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    if (Auth::check()) {
        return redirect()->route('today');
    }
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/inbox', function () {
    $inbox = auth()->user()->getDefaultProject();
    $inbox->load('unsectionedTodos');
    $inbox->load('sections');
    return Inertia::render('Inbox', [
        'project' => $inbox
    ]);
})->middleware(['auth', 'verified'])->name('inbox');

Route::get('/today', function () {
    $user = auth()->user();
    return Inertia::render('Today', [
        'overdue' => $user->overdueTasks,
        'today' => $user->today,
    ]);
})->middleware(['auth', 'verified'])->name('today');

Route::get('/upcoming', function () {
    return Inertia::render('Upcoming');
})->middleware(['auth', 'verified'])->name('upcoming');

Route::get('/filters-labels', function () {
    return Inertia::render('FiltersLabels');
})->middleware(['auth', 'verified'])->name('filters-labels');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resource('todos', TodoController::class)
    ->only(['index', 'store', 'update', 'destroy'])
    ->middleware(['auth', 'verified']);

// Route::resource('sections', SectionController::class)
//     ->only(['index', 'store', 'update', 'destroy'])
//     ->middleware(['auth', 'verified']);

Route::resource('projects', ProjectController::class)
    ->only(['index', 'store', 'update', 'destroy', 'show'])
    ->middleware(['auth', 'verified']);

require __DIR__.'/auth.php';
