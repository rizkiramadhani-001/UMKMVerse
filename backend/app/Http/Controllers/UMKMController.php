<?php

namespace App\Http\Controllers;

use Illuminate\Container\Attributes\Storage;
use Illuminate\Http\Request;
use App\Http\Requests\UMKMStoreRequest;
use App\Models\UMKM;


class UMKMController extends Controller
{
    public function profileUpload(Request $request)
    {


        $request->validate([
            'thumbnail' => 'required',
            'file_upload' => 'required',
            'name' => 'required',
            'description' => 'required',
            'pdf_url' => 'required'            
        ]);

        $path = $request->file('file_upload')->storeAs('uploads/video', $request->file('file_upload')->getClientOriginalName());

        return response()->json([
            'message' => [
                'data'=>'success',
                'file_upload' => [
                    'name' => $request->file('file_upload')->getClientOriginalName(),
                    'mime' => $request->file('file_upload')->getMimeType(),
                    'size' => $request->file('file_upload')->getSize(),
                ]
            ]
        ]);
    }

    /**
     * Store a newly created UMKM in storage.
     */
    public function store(UMKMStoreRequest $request)
    {
        $user = $request->user();

        // Handle thumbnail upload
        $thumbnailPath = $request->file('thumbnail')->store('uploads/thumbnails');

        // Optional video
        $videoPath = null;
        if ($request->hasFile('video_profile')) {
            $videoPath = $request->file('video_profile')->store('uploads/video');
        }

        // Optional PDF
        $pdfPath = null;
        if ($request->hasFile('pdf')) {
            $pdfPath = $request->file('pdf')->store('uploads/pdf');
        }

        $umkm = UMKM::create([
            'user_id' => $user->id,
            'thumbnail' => $thumbnailPath,
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'video_profile_url' => $videoPath,
            'pdf_url' => $pdfPath,
        ]);

        return response()->json(['data' => $umkm], 201);
    }
}
