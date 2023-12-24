<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $user = User::find($this->id);
        return [
            'id' => $this->id,
            'name' => $this->name,
            'followers' => $user->followers,
            'following' => $user->followings,
            'following_count' => $user->followings()->count(),
            'followers_count' => $user->followers()->count(),
            'email' => $this->email,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

        ];
    }
}
