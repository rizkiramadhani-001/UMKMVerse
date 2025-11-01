<?php

use App\Events\MessageSent;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/send-message', function () {
    // Sending a simple object instead of a model
    $message = [
        'user' => 'John Doe',
        'text' => 'Hello from Laravel Reverb!',
        'timestamp' => now()->toDateTimeString(),
    ];
    
    // Fire the event
    broadcast(new MessageSent($message));

    return response()->json(['status' => 'Message broadcasted!']);
});
