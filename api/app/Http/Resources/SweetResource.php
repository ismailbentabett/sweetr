<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Maize\Markable\Models\Like;
use Maize\Markable\Models\Bookmark;

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

        return parent::toArray($request) + [
            'user' => $sweet->user,
            'liked' => Like::has($sweet, $this->user),
            'likes_count' => Like::count($sweet),
            'bookmarked' => Bookmark::has($sweet, $this->user),
        ];
    }
}
