<?php

namespace Database\Factories;

use App\Models\Chat;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChatFactory extends Factory
{
    protected $model = Chat::class;

    public function definition()
    {
        // user_one_id and user_two_id should be provided when creating
        return [
            'user_one_id' => 1,
            'user_two_id' => 2,
        ];
    }
}
