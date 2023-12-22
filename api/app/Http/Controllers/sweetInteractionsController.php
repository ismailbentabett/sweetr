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

    /* Like::add($course, $user); // marks the course liked for the given user

Like::remove($course, $user); // unmarks the course liked for the given user

Like::toggle($course, $user); // toggles the course like for the given user

Like::has($course, $user); // returns whether the given user has marked as liked the course or not

Like::count($course); // returns the amount of like marks for the given course */

    //like and unlike sweet
    public function like(Request $request)
    {
        $AuthUser = User::where("id", Auth::user()->id)->first();
        $sweet = Sweet::where("id", $request->sweet_id)->first();

        Like::add($sweet, $AuthUser);

        return response()->json([
            'message' => 'You have liked this sweet',
        ]);
    }

    public function unlike(Request $request)
    {
        $AuthUser = User::where('id', Auth::user()->id)->first();
        $sweet = Sweet::where('id', $request->sweet_id)->first();
        Like::remove($sweet, $AuthUser);
        return response()->json([
            'message' => 'You have unliked this sweet',
        ]);
    }

    public function bookmark(Request $request)
    {
        $AuthUser = User::where('id', Auth::user()->id)->first();
        $sweet = Sweet::where('id', $request->sweet_id)->first();
        Bookmark::add($sweet, $AuthUser);
        return response()->json([
            'message' => 'You have bookmarked this sweet',
        ]);
    }
    public function unBookMark(Request $request)
    {
        $AuthUser = User::where('id', Auth::user()->id)->first();
        $sweet = Sweet::where('id', $request->sweet_id)->first();
        Bookmark::remove($sweet, $AuthUser);
        return response()->json([
            'message' => 'You have unbookmarked this sweet',
        ]);
    }
}
