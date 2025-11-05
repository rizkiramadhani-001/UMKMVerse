<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Transaction;
use Illuminate\Support\Str;

class TransactionController extends Controller
{
    public function index(Request $request)
    {
        // Optionally filter by UMKM user
        $query = Transaction::query();

        if ($request->has('umkm_id')) {
            $query->where('umkm_id', $request->umkm_id);
        }

        $transactions = $query->orderBy('date', 'desc')->get();
        return response()->json($transactions);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:income,expense',
            'description' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'amount' => 'required|numeric|min:0',
            'date' => 'required|date',
            'notes' => 'nullable|string',
            'umkm_id' => 'nullable|exists:users,id'
        ]);

        // Generate trx_id automatically
        $lastId = Transaction::max('id') + 1;
        $validated['trx_id'] = 'TRX-' . str_pad($lastId, 3, '0', STR_PAD_LEFT);

        $transaction = Transaction::create($validated);

        return response()->json([
            'message' => 'Transaction created successfully.',
            'data' => $transaction
        ], 201);
    }

    public function show($id)
    {
        $transaction = Transaction::where('trx_id', $id)->orWhere('id', $id)->firstOrFail();
        return response()->json($transaction);
    }

    public function update(Request $request, $id)
    {
        $transaction = Transaction::where('trx_id', $id)->orWhere('id', $id)->firstOrFail();

        $validated = $request->validate([
            'type' => 'required|in:income,expense',
            'description' => 'required|string|max:255',
            'category' => 'nullable|string|max:255',
            'amount' => 'required|numeric|min:0',
            'date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        $transaction->update($validated);

        return response()->json([
            'message' => 'Transaction updated successfully.',
            'data' => $transaction
        ]);
    }

    public function destroy($id)
    {
        $transaction = Transaction::where('trx_id', $id)->orWhere('id', $id)->firstOrFail();
        $transaction->delete();

        return response()->json(['message' => 'Transaction deleted successfully.']);
    }
}
