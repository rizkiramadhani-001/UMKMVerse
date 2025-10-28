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
            'user_id' => 'required|exists:users,id',
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

        // Upload file logo
        $logoPath = $request->hasFile('logo')
            ? $request->file('logo')->store('uploads/logo', 'public')
            : null;

        // Upload video pitch
        $videoPitchPath = $request->hasFile('videoPitchUrl')
            ? $request->file('videoPitchUrl')->store('uploads/video', 'public')
            : null;

        // Upload multiple product photos
        $fotoProdukPaths = [];
        if ($request->hasFile('fotoProduk')) {
            foreach ($request->file('fotoProduk') as $file) {
                $fotoProdukPaths[] = $file->store('uploads/foto_produk', 'public');
            }
        }

        // Save to database
        $umkm = UMKM::create([
            'user_id' => $request->user('id'),
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
            'message' => 'Profil UMKM berhasil disimpan',
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
     * Update UMKM data with file handling.
     */
    public function update(Request $request, $id)
    {
        $umkm = UMKM::findOrFail($id);

        $request->validate([
            'namaUmkm' => 'sometimes|string|max:255',
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

        $data = $request->except(['logo', 'videoPitchUrl', 'fotoProduk']);

        // === Replace files if new ones are uploaded ===
        if ($request->hasFile('logo')) {
            if ($umkm->logo) Storage::disk('public')->delete($umkm->logo);
            $data['logo'] = $request->file('logo')->store('uploads/logo', 'public');
        }

        if ($request->hasFile('videoPitchUrl')) {
            if ($umkm->videoPitchUrl) Storage::disk('public')->delete($umkm->videoPitchUrl);
            $data['videoPitchUrl'] = $request->file('videoPitchUrl')->store('uploads/video', 'public');
        }

        if ($request->hasFile('fotoProduk')) {
            // Delete old files
            if ($umkm->fotoProduk) {
                foreach (json_decode($umkm->fotoProduk, true) as $path) {
                    Storage::disk('public')->delete($path);
                }
            }

            $fotoPaths = [];
            foreach ($request->file('fotoProduk') as $file) {
                $fotoPaths[] = $file->store('uploads/foto_produk', 'public');
            }
            $data['fotoProduk'] = json_encode($fotoPaths);
        }

        $umkm->update($data);

        return response()->json([
            'message' => 'Profil UMKM berhasil diperbarui',
            'data' => $umkm,
        ]);
    }

    /**
     * Delete UMKM record and files.
     */
    public function destroy($id)
    {
        $umkm = UMKM::findOrFail($id);

        // Delete associated files
        if ($umkm->logo) Storage::disk('public')->delete($umkm->logo);
        if ($umkm->videoPitchUrl) Storage::disk('public')->delete($umkm->videoPitchUrl);
        if ($umkm->fotoProduk) {
            foreach (json_decode($umkm->fotoProduk, true) as $path) {
                Storage::disk('public')->delete($path);
            }
        }

        $umkm->delete();

        return response()->json(['message' => 'UMKM berhasil dihapus beserta file terkait']);
    }
}
