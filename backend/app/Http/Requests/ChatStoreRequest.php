<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ChatStoreRequest extends FormRequest
{
    public function authorize(): bool
    {
        return auth()->check();
    }

    public function rules(): array
    {
        return [
            'other_user_id' => 'required|exists:users,id',
        ];
    }
}
