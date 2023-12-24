<?php

namespace App\Http\Controllers;

use App\Models\Sweet;
use Maize\Markable\Models\Like;
use Maize\Markable\Models\Bookmark;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class sweetInteractionsController extends Controller
{


    public function like($id)
    {
        $AuthUser = User::where("id", Auth::user()->id)->first();
        $sweet = Sweet::where("id", $id)->first();

        Like::add($sweet, $AuthUser);

        return response()->json([
            'message' => 'You have liked this sweet',
        ]);
    }

    public function unlike($id)
    {
        $AuthUser = User::where('id', Auth::user()->id)->first();
        $sweet = Sweet::where("id", $id)->first();
        Like::remove($sweet, $AuthUser);
        return response()->json([
            'message' => 'You have unliked this sweet',
        ]);
    }

    public function bookmark($id)
    {
        $AuthUser = User::where('id', Auth::user()->id)->first();
        $sweet = Sweet::where("id", $id)->first();
        Bookmark::add($sweet, $AuthUser);
        return response()->json([
            'message' => 'You have bookmarked this sweet',
        ]);
    }
    public function unBookMark($id)
    {
        $AuthUser = User::where('id', Auth::user()->id)->first();
        $sweet = Sweet::where("id", $id)->first();
        Bookmark::remove($sweet, $AuthUser);
        return response()->json([
            'message' => 'You have unbookmarked this sweet',
        ]);
    }
}
