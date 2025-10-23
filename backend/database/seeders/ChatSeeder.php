<?php

namespace Database\Seeders;

use App\Models\Chat;
use App\Models\ChatMessage;
use App\Models\User;
use Illuminate\Database\Seeder;

class ChatSeeder extends Seeder
{
    public function run()
    {
        // Create some users
        $users = User::factory()->count(5)->create();

        // Create pairwise chats between first 3 users
        $pairs = [
            [$users[0]->id, $users[1]->id],
            [$users[0]->id, $users[2]->id],
            [$users[1]->id, $users[2]->id],
        ];

        foreach ($pairs as $pair) {
            [$a, $b] = $pair;
            $one = min($a, $b);
            $two = max($a, $b);
            $chat = Chat::create([
                'user_one_id' => $one,
                'user_two_id' => $two,
            ]);

            // Create some messages
            ChatMessage::create([
                'chat_id' => $chat->id,
                'sender_id' => $a,
                'message' => "Hello from user {$a} to {$b}",
            ]);

            ChatMessage::create([
                'chat_id' => $chat->id,
                'sender_id' => $b,
                'message' => "Reply from user {$b}",
            ]);
        }
    }
}
