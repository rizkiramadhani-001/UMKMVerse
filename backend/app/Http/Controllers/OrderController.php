<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // GET /api/orders
    public function index()
    {
        return response()->json(Order::with(['umkm', 'supplier'])->latest()->get());
    }

    // POST /api/orders
    public function store(Request $request)
    {
        $validated = $request->validate([
            'sender' => 'required|exists:users,id',
            'reciever' => 'required|exists:users,id',
            'produk' => 'required|string|max:255',
            'jumlah' => 'required|integer|min:1',
            'catatan' => 'nullable|string',
        ]);

        $order = Order::create($validated);

        return response()->json([
            'message' => 'Pesanan berhasil dibuat',
            'data' => $order
        ], 201);
    }

    // GET /api/orders/{id}
    public function show($id)
    {
        $order = Order::with(['umkm', 'supplier'])->findOrFail($id);
        return response()->json($order);
    }

    // PUT /api/orders/{id}
    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        $validated = $request->validate([
            'status' => 'in:Pending,Diproses,Dikirim,Selesai,Dibatalkan',
            'catatan' => 'nullable|string',
        ]);

        $order->update($validated);

        return response()->json([
            'message' => 'Pesanan diperbarui',
            'data' => $order
        ]);
    }

    // DELETE /api/orders/{id}
    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();

        return response()->json(['message' => 'Pesanan dihapus']);
    }
}
