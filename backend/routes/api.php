<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UMKMController;
use App\Http\Controllers\InvestorController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\DistributorController;

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
Route::get('/supplier/dashboard', function (Request $request) {
    return response()->json($request->user());  // Returns the authenticated supplier's data
})->middleware(['auth:sanctum', 'HasRole:distributor']);



//FileUpload

// Create UMKM (requires authentication)
Route::post('/umkm', [UMKMController::class, 'store'])->middleware('auth:sanctum');

// Create investor/supplier/distributor profiles
Route::post('/investor', [InvestorController::class, 'store'])->middleware('auth:sanctum');
Route::post('/supplier', [SupplierController::class, 'store'])->middleware('auth:sanctum');
Route::post('/distributor', [DistributorController::class, 'store'])->middleware('auth:sanctum');


