<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChatMessageStoreRequest;
use App\Models\Chat;
use App\Models\ChatMessage;
use Illuminate\Http\Request;

class ChatMessageController extends Controller
{
    // List messages for a chat
    public function index(Request $request, Chat $chat)
    {
        $user = $request->user();
        // ensure user is participant
        if ($chat->user_one_id !== $user->id && $chat->user_two_id !== $user->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $messages = $chat->messages()->with('sender')->oldest()->get();
        return response()->json($messages);
    }

    // Send a message in a chat
    public function store(ChatMessageStoreRequest $request, Chat $chat)
    {
        $user = $request->user();
        if ($chat->user_one_id !== $user->id && $chat->user_two_id !== $user->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $message = $chat->messages()->create([
            'sender_id' => $user->id,
            'message' => $request->input('message'),
        ]);

        return response()->json(['data' => $message], 201);
    }

    // Mark all unread messages as read for the authenticated user
    public function markRead(Request $request, Chat $chat)
    {
        $user = $request->user();
        if ($chat->user_one_id !== $user->id && $chat->user_two_id !== $user->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $updated = $chat->messages()
            ->whereNull('read_at')
            ->where('sender_id', '!=', $user->id)
            ->update(['read_at' => now()]);

        return response()->json(['updated' => $updated]);
    }

    // Delete a message (only sender can delete)
    public function destroy(Request $request, Chat $chat, ChatMessage $message)
    {
        $user = $request->user();
        if ($message->sender_id !== $user->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $message->delete();
        return response()->json(['deleted' => true]);
    }
}
