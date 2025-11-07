<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of supplier's products
     */
    public function index(Request $request)
    {
        try {
            $user = $request->user();

            $query = Product::with(['category'])
                ->where('supplier_id', $user->id);

            // Filter by status
            if ($request->has('status')) {
                $query->where('status', $request->status);
            }

            // Filter by category
            if ($request->has('category_id')) {
                $query->where('category_id', $request->category_id);
            }

            // Search
            if ($request->has('search')) {
                $query->search($request->search);
            }

            // Sort
            $sortBy = $request->get('sort_by', 'created_at');
            $sortOrder = $request->get('sort_order', 'desc');
            $query->orderBy($sortBy, $sortOrder);

            // Pagination
            $perPage = $request->get('per_page', 10);
            $products = $query->paginate($perPage);

            return response()->json([
                'success' => true,
                'message' => 'Products retrieved successfully',
                'data' => $products,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve products',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Store a newly created product
     */
    public function store(Request $request)
    {
        try {
            $user = $request->user();

            // Validation
            $validator = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'category_id' => 'required|',
                'description' => 'required|string|min:20',
                'price' => 'required|numeric|min:0',
                'unit' => 'required|string|max:50',
                'stock' => 'required|integer|min:0',
                'min_order' => 'required|integer|min:1',
                'status' => 'required|in:active,inactive',
                'images' => 'required|array|min:1|max:5',
                'images.*' => 'required|image|mimes:jpeg,png,jpg|max:2048', // 2MB max
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors(),
                ], 422);
            }

            DB::beginTransaction();

            // Upload images
            $imagePaths = [];
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $path = $image->store('products', 'public');
                    $imagePaths[] = $path;
                }
            }

            // Create product
            $product = Product::create([
                'supplier_id' => $user->id,
                'category_id' => $request->category_id,
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'unit' => $request->unit,
                'stock' => $request->stock,
                'min_order' => $request->min_order,
                'status' => $request->status,
                'images' => $imagePaths,
            ]);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Product created successfully',
                'data' => $product->load('category'),
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            // Delete uploaded images if product creation fails
            if (isset($imagePaths)) {
                foreach ($imagePaths as $path) {
                    Storage::disk('public')->delete($path);
                }
            }

            return response()->json([
                'success' => false,
                'message' => 'Failed to create product',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

public function getBySupplier($supplier_id)
{
    $products = Product::where('supplier_id', $supplier_id)->get();
    return response()->json(['success' => true, 'data' => $products]);
}


    /**
     * Display the specified product
     */
    public function show(Request $request, $id)
    {
        try {
            $user = $request->user();

            $product = Product::with(['category', 'supplier'])
                ->where('id', $id)
                ->orWhere('supplier_id', $id)
                ->where('supplier_id', $user->id)
                ->firstOrFail();

            return response()->json([
                'success' => true,
                'message' => 'Product retrieved successfully',
                'data' => $product,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Product not found',
                'error' => $e->getMessage(),
            ], 404);
        }
    }

    /**
     * Update the specified product
     */
    public function update(Request $request, $id)
    {
        try {
            $user = $request->user();

            $product = Product::where('id', $id)
                ->where('supplier_id', $user->id)
                ->firstOrFail();

            // Validation
            $validator = Validator::make($request->all(), [
                'name' => 'sometimes|required|string|max:255',
                'category_id' => 'sometimes|required|exists:categories,id',
                'description' => 'sometimes|required|string|min:20',
                'price' => 'sometimes|required|numeric|min:0',
                'unit' => 'sometimes|required|string|max:50',
                'stock' => 'sometimes|required|integer|min:0',
                'min_order' => 'sometimes|required|integer|min:1',
                'status' => 'sometimes|required|in:active,inactive',
                'images' => 'sometimes|array|min:1|max:5',
                'images.*' => 'required|image|mimes:jpeg,png,jpg|max:2048',
                'delete_images' => 'sometimes|array', // Array of image paths to delete
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors(),
                ], 422);
            }

            DB::beginTransaction();

            $updateData = $request->only([
                'name',
                'category_id',
                'description',
                'price',
                'unit',
                'stock',
                'min_order',
                'status',
            ]);

            // Handle image updates
            $currentImages = $product->images ?? [];

            // Delete specified images
            if ($request->has('delete_images')) {
                foreach ($request->delete_images as $imageToDelete) {
                    if (($key = array_search($imageToDelete, $currentImages)) !== false) {
                        Storage::disk('public')->delete($imageToDelete);
                        unset($currentImages[$key]);
                    }
                }
                $currentImages = array_values($currentImages); // Reindex array
            }

            // Upload new images
            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    if (count($currentImages) >= 5) {
                        break; // Maximum 5 images
                    }
                    $path = $image->store('products', 'public');
                    $currentImages[] = $path;
                }
            }

            $updateData['images'] = $currentImages;

            // Update product
            $product->update($updateData);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Product updated successfully',
                'data' => $product->fresh()->load('category'),
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Failed to update product',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Remove the specified product
     */
    public function destroy(Request $request, $id)
    {
        try {
            $user = $request->user();

            $product = Product::where('id', $id)
                ->where('supplier_id', $user->id)
                ->firstOrFail();

            DB::beginTransaction();

            // Delete images
            if ($product->images) {
                foreach ($product->images as $image) {
                    Storage::disk('public')->delete($image);
                }
            }

            // Soft delete product
            $product->delete();

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Product deleted successfully',
            ], 200);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Failed to delete product',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update product status
     */
    public function updateStatus(Request $request, $id)
    {
        try {
            $user = $request->user();

            $validator = Validator::make($request->all(), [
                'status' => 'required|in:active,inactive',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors(),
                ], 422);
            }

            $product = Product::where('id', $id)
                ->where('supplier_id', $user->id)
                ->firstOrFail();

            $product->update(['status' => $request->status]);

            return response()->json([
                'success' => true,
                'message' => 'Product status updated successfully',
                'data' => $product,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update product status',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Update product stock
     */
    public function updateStock(Request $request, $id)
    {
        try {
            $user = $request->user();

            $validator = Validator::make($request->all(), [
                'stock' => 'required|integer|min:0',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Validation error',
                    'errors' => $validator->errors(),
                ], 422);
            }

            $product = Product::where('id', $id)
                ->where('supplier_id', $user->id)
                ->firstOrFail();

            $product->update(['stock' => $request->stock]);

            return response()->json([
                'success' => true,
                'message' => 'Product stock updated successfully',
                'data' => $product,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update product stock',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get product statistics
     */
    public function statistics(Request $request)
    {
        try {
            $user = $request->user();

            $stats = [
                'total_products' => Product::where('supplier_id', $user->id)->count(),
                'active_products' => Product::where('supplier_id', $user->id)->active()->count(),
                'inactive_products' => Product::where('supplier_id', $user->id)->where('status', 'inactive')->count(),
                'low_stock_products' => Product::where('supplier_id', $user->id)
                    ->where('stock', '>', 0)
                    ->where('stock', '<=', 10)
                    ->count(),
                'out_of_stock_products' => Product::where('supplier_id', $user->id)->where('stock', 0)->count(),
                'total_views' => Product::where('supplier_id', $user->id)->sum('view_count'),
                'total_orders' => Product::where('supplier_id', $user->id)->sum('order_count'),
            ];

            return response()->json([
                'success' => true,
                'message' => 'Statistics retrieved successfully',
                'data' => $stats,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve statistics',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get categories for dropdown
     */
    public function categories(Request $request)
    {
        try {
            $categories = Category::active()->ordered()->get();

            return response()->json([
                'success' => true,
                'message' => 'Categories retrieved successfully',
                'data' => $categories,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve categories',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}