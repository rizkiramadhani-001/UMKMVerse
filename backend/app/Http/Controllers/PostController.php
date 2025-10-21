<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostStoreRequest;
use App\Models\Post;
use App\Models\Thread;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Thread $thread)
    {
        return response()->json($thread->posts()->with('user')->get());
    }

    public function store(PostStoreRequest $request, Thread $thread)
    {
        $user = $request->user();
        $post = Post::create([
            'thread_id' => $thread->id,
            'user_id' => $user->id,
            'body' => $request->input('body'),
        ]);
        return response()->json(['data' => $post], 201);
    }

    public function update(PostStoreRequest $request, Thread $thread, Post $post)
    {
        $user = $request->user();
        if ($user->id !== $post->user_id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }
        $post->update($request->only(['body']));
        return response()->json(['data' => $post]);
    }

    public function destroy(Request $request, Thread $thread, Post $post)
    {
        $user = $request->user();
        if ($user->id !== $post->user_id) {
            return response()->json(['error' => 'Forbidden'], 403);
        }
        $post->delete();
        return response()->json([], 204);
    }
}
