<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UMKM;
use Illuminate\Support\Facades\Storage;

class UMKMController extends Controller
{
    /**
     * Store UMKM profile with file uploads.
     */
    public function store(Request $request)
    {
        $request->validate([
            'namaUmkm' => 'required|string|max:255',
            'nib' => 'nullable|string|max:100',
            'bidangUsaha' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:50',
            'website' => 'nullable|string|max:255',
            'lokasiUsaha' => 'nullable|string|max:255',
            'alamatLengkap' => 'nullable|string',
            'deskripsiSingkat' => 'nullable|string',
            'deskripsiLengkap' => 'nullable|string',
            'visiMisi' => 'nullable|string',
            'targetPasar' => 'nullable|string|max:255',
            'keunggulanProduk' => 'nullable|string',
            'videoPitchUrl' => 'nullable|file|mimes:mp4,mov,avi|max:20000',
            'minInvestasi' => 'nullable|numeric',
            'targetInvestasi' => 'nullable|numeric',
            'logo' => 'nullable|image|mimes:jpg,jpeg,png|max:4096',
            'fotoProduk.*' => 'nullable|image|mimes:jpg,jpeg,png|max:4096',
        ]);

        // Upload logo
        $logoPath = null;
        if ($request->hasFile('logo')) {
            $logoPath = $request->file('logo')->store('uploads/logo', 'public');
        }

        // Upload video (if any)
        $videoPitchPath = null;
        if ($request->hasFile('videoPitchUrl')) {
            $videoPitchPath = $request->file('videoPitchUrl')->store('uploads/video', 'public');
        }

        // Upload product photos (if any)
        $fotoProdukPaths = [];
        if ($request->hasFile('fotoProduk')) {
            foreach ($request->file('fotoProduk') as $file) {
                $fotoProdukPaths[] = $file->store('uploads/foto_produk', 'public');
            }
        }

        // Save to database
        $umkm = UMKM::create([
            'namaUmkm' => $request->namaUmkm,
            'nib' => $request->nib,
            'bidangUsaha' => $request->bidangUsaha,
            'email' => $request->email,
            'phone' => $request->phone,
            'website' => $request->website,
            'lokasiUsaha' => $request->lokasiUsaha,
            'alamatLengkap' => $request->alamatLengkap,
            'deskripsiSingkat' => $request->deskripsiSingkat,
            'deskripsiLengkap' => $request->deskripsiLengkap,
            'visiMisi' => $request->visiMisi,
            'targetPasar' => $request->targetPasar,
            'keunggulanProduk' => $request->keunggulanProduk,
            'videoPitchUrl' => $videoPitchPath,
            'minInvestasi' => $request->minInvestasi,
            'targetInvestasi' => $request->targetInvestasi,
            'logo' => $logoPath,
            'fotoProduk' => json_encode($fotoProdukPaths),
        ]);

        return response()->json([
            'message' => 'UMKM berhasil disimpan',
            'data' => $umkm,
        ], 201);
    }

    /**
     * Display a specific UMKM profile.
     */
    public function show($id)
    {
        $umkm = UMKM::findOrFail($id);
        return response()->json($umkm);
    }

    /**
     * Update UMKM data.
     */
    public function update(Request $request, $id)
    {
        $umkm = UMKM::findOrFail($id);

        $umkm->update($request->all());

        return response()->json([
            'message' => 'UMKM berhasil diperbarui',
            'data' => $umkm,
        ]);
    }

    /**
     * Delete UMKM record.
     */
    public function destroy($id)
    {
        $umkm = UMKM::findOrFail($id);
        $umkm->delete();

        return response()->json(['message' => 'UMKM berhasil dihapus']);
    }
}
