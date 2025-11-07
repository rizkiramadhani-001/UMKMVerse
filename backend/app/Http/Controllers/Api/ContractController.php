<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contract;
use App\Models\Umkm;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ContractController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        return Contract::where('user_id', $user->id)
            ->orWhere('partner_email', $user->email)
            ->orderBy('created_at', 'desc')
            ->get();
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $contract = Contract::create([
            'user_id' => $user->id,
            'contract_number' => $request->contract_number,
            'type' => $request->type,
            'contract_url' => $request->contract_url,
            'partner_name' => $request->partner_name,
            'partner_email' => $request->partner_email,
            'partner_type' => $request->partner_type,
            'amount' => $request->amount,
            'expiry_date' => $request->expiry_date,
            'description' => $request->description,
        ]);

        return response()->json($contract, 201);
    }

    public function show(Contract $contract)
    {
        return $contract;
    }

    public function update(Request $request, Contract $contract)
    {
        $contract->update($request->all());
        return response()->json($contract);
    }

    public function updateStatus(Request $request)
    {
        $contract = Contract::findOrFail($request->get('id'));
        $contract->status = 'signed';
        $contract->save();

        return response()->json(['message' => 'Contract marked as signed']);
    }

    public function destroy(Contract $contract)
    {
        if ($contract->file_path) {
            Storage::disk('public')->delete($contract->file_path);
        }
        $contract->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }

    public function download(Contract $contract)
    {
        return response()->download(storage_path("app/public/{$contract->file_path}"));
    }

    /**
     * 🔹 Get all UMKM where UMKM.email matches partner_email from
     * signed contracts created by the authenticated user
     */
    public function getAllUmkmFromSignedContractsByUser(Request $request)
    {
        $user = $request->user();

        // Get all signed contracts created by this user
        $signedContracts = Contract::where('user_id', $user->id)
            ->where('status', 'signed')
            ->get();

        if ($signedContracts->isEmpty()) {
            return response()->json(['message'=> 'empty']);
        }

        // Extract unique partner emails
        $partnerEmails = $signedContracts->pluck('partner_email')->unique();

        // Find UMKM where their email matches the contract partner_email
        $umkms = Umkm::whereIn('email', $partnerEmails)->get();

        return response()->json([
            'user_id' => $user->id,
            'total_signed_contracts' => $signedContracts->count(),
            'total_umkm' => $umkms->count(),
            'umkms' => $umkms,
            'contracts' => $signedContracts
        ]);
    }
}
