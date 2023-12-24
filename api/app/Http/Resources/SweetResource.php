<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;
use Maize\Markable\Models\Like;
use Maize\Markable\Models\Bookmark;

class SweetResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $sweet = $this->resource;
        $authUser = User::find(Auth::user()->id);
        return [
            'id' => $this->id,
            'content' => $this->content,
            'user' => new UserResource($this->whenLoaded('user')),
            'liked' => Like::has($sweet, $authUser),
            'bookmarked' => Bookmark::has($sweet, $authUser),
            'likes_count' => Like::count($sweet),
            'bookmarks_count' => Bookmark::count($sweet),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'), // Adjust the format as needed
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'), // Adjust the format as needed
        ];
    }
}
