<?php

namespace App\Models;

use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphMany;

class Project extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description', 'color', 'favorite',
        'layout', 'is_default', 'is_favorite'];

    public static $rules = [
        'title' => 'required',
        'layout' => 'required|in:list,board',
        'color' => 'regex:/^#?[a-fA-F0-9]{6}$/',
    ];

    protected $casts = [
        'is_default' => 'boolean',
        'is_favorite' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function todos(): HasMany
    {
        return $this->hasMany(Todo::class);
    }

    public function unsectionedTodos(): HasMany
    {
        return $this->hasMany(Todo::class)->withoutSection();
    }

    public function sections(): HasMany
    {
        return $this->hasMany(Section::class);
    }

    public function comments(): MorphMany
    {
        return $this->morphMany(Comment::class, 'commentable');
    }

     /**
     * Scope to retrieve projects that does not include the default.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeWithoutDefault(Builder $query): Builder
    {
        return $query->where('is_default', '!=', true);
    }
}
