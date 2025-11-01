<?php

namespace Database\Factories;

use App\Models\ChatMessage;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChatMessageFactory extends Factory
{
    protected $model = ChatMessage::class;

    public function definition()
    {
        return [
            'chat_id' => 1,
            'sender_id' => 1,
            'message' => $this->faker->sentence(),
            'read_at' => null,
        ];
    }
}
