<?php
namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class PhotoGalleryUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'gallery_name'        => 'required',
            'gallery_description' => 'required|max:255',
            'cover'               => 'file',
        ];
    }

    public function messages(): array
    {
        return [
            'gallery_name.required'        => 'O campo gallery_name é obrigatório.',
            'gallery_description.required' => 'O campo gallery_name obrigatório.',
            'gallery_description.max'      => 'O campo gallery_description deve ter no máximo 255 caracteres.',
            'cover.file'                   => 'O campo cover deve conter uma imagem válida.',
        ];
    }
}
