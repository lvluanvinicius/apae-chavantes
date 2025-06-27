<?php
namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class UserCreateRequest extends FormRequest
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
            'email'    => 'required|email|max:255|unique:users,email,except,id',
            'password' => 'required|min:8',
            'name'     => 'required|max:255',
        ];
    }

    public function messages(): array
    {
        return [
            "email.required"    => "E-mail é obrigatório.",
            "email.email"       => "Informe um e-mail válido.",
            "email.max"         => "O e-mail deve conter no máximo 255 caracteres.",
            "email.unique"      => "O e-mail informado já existe..",
            "password.required" => "A senha é obrigatória.",
            "password.max"      => "A senha deve conter no mínimo 8 caracteres.",
            "name.required"     => "O nome é obrigatório.",
            "name.max"          => "O nome deve conter no máximo 255 caracteres.",
        ];
    }
}
