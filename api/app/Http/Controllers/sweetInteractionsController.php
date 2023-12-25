<?php

namespace App\Http\Controllers;

use App\Http\Resources\SweetResource;
use App\Models\Sweet;
use Maize\Markable\Models\Like;
use Maize\Markable\Models\Bookmark;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class sweetInteractionsController extends Controller
{
    public function likedSweets()
    {


        $likes = Sweet::whereHasLike(
            auth()->user()
        )->get();

        return SweetResource::collection($likes);
    }

    public function bookmarkedSweets()
    {
        $bookmarks = Sweet::whereHasBookmark(
            auth()->user()
        )->get();

        return SweetResource::collection($bookmarks);
    }

    public function like($id)
    {
        $AuthUser = User::where("id", Auth::user()->id)->first();
        $sweet = Sweet::where("id", $id)->first();

        Like::add($sweet, $AuthUser);

        return new SweetResource($sweet);
    }

    public function unlike($id)
    {
        $AuthUser = User::where('id', Auth::user()->id)->first();
        $sweet = Sweet::where("id", $id)->first();
        Like::remove($sweet, $AuthUser);
        return new SweetResource($sweet);
    }

    public function bookmark($id)
    {
        $AuthUser = User::where('id', Auth::user()->id)->first();
        $sweet = Sweet::where("id", $id)->first();
        Bookmark::add($sweet, $AuthUser);
        return new SweetResource($sweet);
    }
    public function unBookMark($id)
    {
        $AuthUser = User::where('id', Auth::user()->id)->first();
        $sweet = Sweet::where("id", $id)->first();
        Bookmark::remove($sweet, $AuthUser);
        return new SweetResource($sweet);
    }
}
