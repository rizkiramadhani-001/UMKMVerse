<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use App\Http\Requests\ChatStoreRequest;
use App\Models\Chat;
use Illuminate\Http\Request;

class ChatController extends Controller
{
    // List chats for authenticated user
    public function index(Request $request)
    {
        $user = $request->user();
        $chats = Chat::where('user_one_id', $user->id)
            ->orWhere('user_two_id', $user->id)
            ->with(['userOne', 'userTwo', 'messages' => function($q){ $q->latest()->limit(1); }])
            ->get();
        return response()->json($chats);
    }

    // Create or find existing chat between authenticated user and other_user_id
    public function store(ChatStoreRequest $request)
    {
        $user = $request->user();
        $otherId = $request->input('other_user_id');
        // Ensure ordering to avoid duplicates: smaller id first
        $one = min($user->id, $otherId);
        $two = max($user->id, $otherId);

        $chat = Chat::firstOrCreate([
            'user_one_id' => $one,
            'user_two_id' => $two,
        ]);

        return response()->json(['data' => $chat], 201);
    }
}
