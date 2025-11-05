<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UMKM;
use App\Models\FotoProduk;
use Illuminate\Support\Facades\Storage;

class UMKMController extends Controller
{
    public function index()
    {
        $data = UMKM::with('fotoProduk')->get();
        return response()->json(['data' => $data]);
    }

    public function store(Request $request)
    {
        $user = $request->user();

        $umkm = UMKM::where('user_id', $user->id)->first();

        $request->validate([
            'namaUmkm' => 'nullable|string|max:255',
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
            'videoPitchUrl' => 'nullable|',
            'minInvestasi' => 'nullable|numeric',
            'targetInvestasi' => 'nullable|numeric',
            'logo' => 'nullable|image|mimes:jpg,jpeg,png|max:4096',
            'fotoProduk.*' => 'nullable|image|mimes:jpg,jpeg,png|max:4096',
        ]);

        $data = $request->except(['logo', 'fotoProduk']);

        // === Upload logo ===
        if ($request->hasFile('logo')) {
            if ($umkm && $umkm->logo) {
                Storage::disk('public')->delete($umkm->logo);
            }
            $data['logo'] = $request->file('logo')->store('uploads/logo', 'public');
        }

        // === Upload video ===


        // === Simpan UMKM baru atau update ===
        if ($umkm) {
            $umkm->update($data);
            $message = 'Profil UMKM diperbarui';
        } else {
            $data['user_id'] = $user->id;
            $umkm = UMKM::create($data);
            $message = 'Profil UMKM dibuat';
        }

        // === Upload Foto Produk (HAS MANY) ===
        if ($request->hasFile('fotoProduk')) {
            foreach ($request->file('fotoProduk') as $file) {
                $path = $file->store('uploads/foto_produk', 'public');
                FotoProduk::create([
                    'umkm_id' => $umkm->id,
                    'path' => $path,
                ]);
            }
        }

        return response()->json([
            'message' => $message,
            'data' => $umkm->load('fotoProduk'),
        ]);
    }

    public function show(Request $request)
    {
            $userId = $request->user()->id;
        $umkm = UMKM::with([
            'user', // Add user relationship
            'fotoProduk' => function ($query) {
                $query->latest()->take(5); // ambil 5 foto terbaru
            }
        ])->where('user_id', $userId)->first();

        if (!$umkm) {
            return response()->json(['message' => 'UMKM tidak ditemukan'], 404);
        }

        return response()->json(['data' => $umkm]);
    }

    public function display(Request $request, $id)
    {
        $userId = $request->user()->id;

        $umkm = UMKM::with([
            'fotoProduk' => function ($query) {
                $query->orderBy('created_at', 'desc')->take(5); // ambil 5 foto terbaru
            }
        ])
            ->where('id', $id) // pastikan ambil berdasarkan ID yang dikirim juga
            ->first();

        if (!$umkm) {
            return response()->json(['message' => 'UMKM tidak ditemukan'], 404);
        }

        // Format hasil agar lebih mudah digunakan di frontend


        return response()->json(['data' => $umkm]);
    }

    public function destroy($id)
    {
        $umkm = UMKM::findOrFail($id);

        // Hapus semua fotoProduk terkait
        foreach ($umkm->fotoProduk as $foto) {
            Storage::disk('public')->delete($foto->path);
            $foto->delete();
        }

        if ($umkm->logo)
            Storage::disk('public')->delete($umkm->logo);
        if ($umkm->videoPitchUrl)
            Storage::disk('public')->delete($umkm->videoPitchUrl);

        $umkm->delete();

        return response()->json(['message' => 'UMKM & foto produk berhasil dihapus']);
    }
}
