<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UMKMController;
use App\Http\Controllers\InvestorController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\DistributorController;
use App\Http\Controllers\ThreadController;
use App\Http\Controllers\PostController;

// Public API Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json($request->user());  // Returns the authenticated user's data
});

//Protected Route
Route::get('/admin/dashboard', function (Request $request) {
    return response()->json($request->user());  // Returns the authenticated user's data
})->middleware(['auth:sanctum', 'HasRole:admin']);
Route::get('/umkm/dashboard', function (Request $request) {
    return response()->json($request->user());  // Returns the authenticated umkm's data
})->middleware(['auth:sanctum', 'HasRole:umkm']);
Route::get('/investor/dashboard', function (Request $request) {
    return response()->json($request->user());  // Returns the authenticated investor's data
})->middleware(['auth:sanctum', 'HasRole:investor']);
Route::get('/supplier/dashboard', function (Request $request) {
    return response()->json($request->user());  // Returns the authenticated supplier's data
})->middleware(['auth:sanctum', 'HasRole:supplier']);
Route::get('/distributor/dashboard', function (Request $request) {
    return response()->json($request->user());  // Returns the authenticated supplier's data
})->middleware(['auth:sanctum', 'HasRole:distributor']);



//FileUpload

// Create UMKM (requires authentication)
Route::post('/umkm', [UMKMController::class, 'store'])->middleware('auth:sanctum');

// Create investor/supplier/distributor profiles
Route::post('/investor', [InvestorController::class, 'store'])->middleware('auth:sanctum');
Route::post('/supplier', [SupplierController::class, 'store'])->middleware('auth:sanctum');
Route::post('/distributor', [DistributorController::class, 'store'])->middleware('auth:sanctum');

// Forum: Threads and Posts
Route::get('/threads', [ThreadController::class, 'index']);
Route::get('/threads/{thread}', [ThreadController::class, 'show']);
Route::post('/threads', [ThreadController::class, 'store'])->middleware('auth:sanctum');
Route::put('/threads/{thread}', [ThreadController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/threads/{thread}', [ThreadController::class, 'destroy'])->middleware('auth:sanctum');

// Posts nested under threads
Route::get('/threads/{thread}/posts', [PostController::class, 'index']);
Route::post('/threads/{thread}/posts', [PostController::class, 'store'])->middleware('auth:sanctum');
Route::put('/threads/{thread}/posts/{post}', [PostController::class, 'update'])->middleware('auth:sanctum');
Route::delete('/threads/{thread}/posts/{post}', [PostController::class, 'destroy'])->middleware('auth:sanctum');



