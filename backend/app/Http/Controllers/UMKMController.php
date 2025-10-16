<?php

namespace App\Http\Controllers;

use Illuminate\Container\Attributes\Storage;
use Illuminate\Http\Request;

class UMKMController extends Controller
{
    public function fileUpload(Request $request)
    {


        $request->validate([
            'file_upload' => 'required',
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
}
