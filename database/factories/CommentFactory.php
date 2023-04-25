<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => function () {
                return factory(App\Models\User::class)->create()->id;
            },
            'commentable_type' => $faker->randomElement(['App\Models\Project', 'App\Models\Todo']),
            'commentable_id' => function (array $comment) {
                $commentableType = $comment['commentable_type'];
                return factory($commentableType)->create()->id;
            },
            'content' => $faker->paragraph,
        ];
    }
}
