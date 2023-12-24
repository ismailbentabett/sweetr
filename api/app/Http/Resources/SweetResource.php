<?php

namespace App\Http\Resources;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Maize\Markable\Models\Like;
use Maize\Markable\Models\Bookmark;
use Illuminate\Support\Facades\Auth;

class SweetResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        $sweet = $this->resource;

        //get current user
        $id = Auth::user()->id;

        $user = User::where('id', $id)->first();
        return parent::toArray($request) + [
            'user' => $sweet->user,
            'liked' =>  Like::has($sweet, $user),
            'likes_count' => Like::count($sweet),
            'bookmarked' => Bookmark::has($sweet, $user),
        ];
    }
}
