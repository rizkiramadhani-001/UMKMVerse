<?php

namespace App\Http\Controllers;

use Illuminate\Container\Attributes\Storage;
use Illuminate\Http\Request;

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
}
