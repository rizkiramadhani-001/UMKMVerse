<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\ProfileStoreRequest;
use App\Models\Distributor;

class DistributorController extends Controller
{
    public function store(ProfileStoreRequest $request)
    {
        $user = $request->user();

        $thumbnailPath = $request->file('thumbnail')->store('uploads/thumbnails');

        $videoPath = null;
        if ($request->hasFile('video_profile')) {
            $videoPath = $request->file('video_profile')->store('uploads/video');
        }

        $pdfPath = null;
        if ($request->hasFile('pdf')) {
            $pdfPath = $request->file('pdf')->store('uploads/pdf');
        }

        $distributor = Distributor::create([
            'user_id' => $user->id,
            'thumbnail' => $thumbnailPath,
            'name' => $request->input('name'),
            'description' => $request->input('description'),
            'video_profile_url' => $videoPath,
            'pdf_url' => $pdfPath,
        ]);

        return response()->json(['data' => $distributor], 201);
    }
}
