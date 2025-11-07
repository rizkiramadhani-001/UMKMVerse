<?php

use App\Events\MessageSent;
use App\Http\Controllers\OrderController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UMKMController;
use App\Http\Controllers\InvestorController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\DistributorController;
use App\Http\Controllers\ThreadController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\ChatMessageController;
use App\Http\Controllers\Api\ContractController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\ProductController;

// Public API Routes


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return response()->json($request->user());  // Returns the authenticated user's data
});
Route::get('/getMe', function (Request $request) {
    return response()->json($request->user());  // Returns the authenticated user's data
})->middleware('auth:sanctum');

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
Route::post('/umkm', [UMKMController::class, 'store'])->middleware(['auth:sanctum']);
Route::get('/umkm', [UMKMController::class, 'index']);
Route::get('/umkm/supplier', [UMKMController::class, 'indexSuppliers']);
Route::get('/umkm/distributor', [UMKMController::class, 'indexDistributor']);


Route::get('/umkm/show', [UMKMController::class, 'show'])->middleware(['auth:sanctum']);
Route::get('/umkm/{id}/display', [UMKMController::class, 'display']);

Route::post('/supplier', [SupplierController::class, 'store'])->middleware('auth:sanctum');


Route::post('/investor', [InvestorController::class, 'store'])->middleware('auth:sanctum');
Route::post('/distributor', [DistributorController::class, 'store'])->middleware('auth:sanctum');


Route::get('/signed-umkm', [ContractController::class, 'getAllUmkmFromSignedContractsByUser'])
    ->middleware('auth:sanctum');


Route::get('/products/by-supplier/{supplier_id}', [ProductController::class, 'getBySupplier']);



Route::middleware(['auth:sanctum'])->group(function () {
    
    // Supplier Product Routes
    Route::prefix('supplier')->group(function () {
        
        // Get categories for product form dropdown
        Route::get('/categories', [ProductController::class, 'categories']);
        
        // Product CRUD
        Route::prefix('products')->group(function () {
            // Get all supplier's products (with filters)
            Route::get('/', [ProductController::class, 'index']);
            
            // Create new product
            Route::post('/', [ProductController::class, 'store']);
            
            // Get single product
            Route::get('/{id}', [ProductController::class, 'show']);
            
            // Update product
            Route::post('/{id}', [ProductController::class, 'update']); // POST for form-data with images
            Route::put('/{id}', [ProductController::class, 'update']); // PUT for JSON
            
            // Delete product
            Route::delete('/{id}', [ProductController::class, 'destroy']);
            
            // Update product status (active/inactive)
            Route::patch('/{id}/status', [ProductController::class, 'updateStatus']);
            
            // Update product stock
            Route::patch('/{id}/stock', [ProductController::class, 'updateStock']);
            
            // Get product statistics
            Route::get('/stats/summary', [ProductController::class, 'statistics']);
        });
    });
});






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


// Chat routes (private chats) - require authentication
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/chats', [ChatController::class, 'index']);
    Route::post('/chats', [ChatController::class, 'store']);
    Route::get('/chats/all/messages', function (Request $request) {
        $user = $request->user();
        $chats = \App\Models\Chat::where('user_one_id', $user->id)
            ->orWhere('user_two_id', $user->id)
            ->with(['messages' => function($q){ $q->oldest(); }])
            ->get();
        $allMessages = [];
        foreach ($chats as $chat) {
            foreach ($chat->messages as $message) {
                $allMessages[] = $message;
            }
        }
        return response()->json($allMessages);
    });

    Route::get('/chats/{chat}/messages', [ChatMessageController::class, 'index']);
    Route::post('/chats/{chat}/messages', [ChatMessageController::class, 'store']);
    Route::post('/chats/{chat}/read', [ChatMessageController::class, 'markRead']);
    Route::delete('/chats/{chat}/messages/{message}', [ChatMessageController::class, 'destroy']);
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


Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('orders', OrderController::class);
});




Route::middleware('auth:sanctum')->group(function () {
    Route::get('/umkm/transactions', [TransactionController::class, 'index']);
    Route::post('/umkm/transactions', [TransactionController::class, 'store']);
    Route::get('/umkm/transactions/{id}', [TransactionController::class, 'show']);
    Route::put('/umkm/transactions/{id}', [TransactionController::class, 'update']);
    Route::delete('/umkm/transactions/{id}', [TransactionController::class, 'destroy']);
});



Route::prefix('contracts')->group(function () {
    Route::get('/', [ContractController::class, 'index'])->middleware(['auth:sanctum']);
    Route::post('/', [ContractController::class, 'store'])->middleware(['auth:sanctum']);
    Route::post('/updateStatus', [ContractController::class, 'updateStatus']);

    // ✅ Place this BEFORE any {contract} routes
Route::get('/signed-umkm', [ContractController::class, 'getAllUmkmFromSignedContractsByUser'])
    ->middleware('auth:sanctum');


    // CRUD routes that use {contract} should be below
    Route::get('/{contract}', [ContractController::class, 'show']);
    Route::put('/{contract}', [ContractController::class, 'update']);
    Route::delete('/{contract}', [ContractController::class, 'destroy']);
    Route::get('/{contract}/download', [ContractController::class, 'download']);
});

