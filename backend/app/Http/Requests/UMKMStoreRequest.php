<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UMKMStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     */
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
