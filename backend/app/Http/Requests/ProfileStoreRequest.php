<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfileStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'thumbnail' => 'required|image|max:2048',
            'video_profile' => 'nullable|mimetypes:video/mp4,video/quicktime|max:51200',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'pdf' => 'nullable|mimes:pdf|max:10240',
        ];
    }
}
