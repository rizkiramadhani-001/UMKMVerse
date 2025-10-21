<?php

namespace App\Http\Controllers;

use App\Http\Requests\ThreadStoreRequest;
use App\Models\Thread;
use Illuminate\Http\Request;

class ThreadController extends Controller
{
    public function index()
    {
        return response()->json(Thread::with('user')->latest()->get());
    }

    public function show(Thread $thread)
    {
        $thread->load(['user', 'posts.user']);
        return response()->json($thread);
    }

    public function store(ThreadStoreRequest $request)
    {
        $user = $request->user();
        $thread = Thread::create([
            'user_id' => $user->id,
            'title' => $request->input('title'),
            'body' => $request->input('body'),
        ]);
        return response()->json(['data' => $thread], 201);
    }

    public function update(ThreadStoreRequest $request, Thread $thread)
    {
        $user = $request->user();
        if ($user->id !== $thread->user_id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }
        $thread->update($request->only(['title', 'body']));
        return response()->json(['data' => $thread]);
    }

    public function destroy(Request $request, Thread $thread)
    {
        $user = $request->user();
        if ($user->id !== $thread->user_id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }
        $thread->delete();
        return response()->json([], 204);
    }
}
