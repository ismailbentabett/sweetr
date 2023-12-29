<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Maize\Markable\Models\Bookmark;
use Maize\Markable\Models\Like;

class commentInteractionsController extends Controller
{
    public function like(Request $request)
    {
        $AuthUser = User::where('id', Auth::user()->id)->first();
        $comment = Comment::where('id', $request->comment_id)->first();

        Like::add($comment, $AuthUser);

        return response()->json([
            'message' => 'You have liked this Comment',
        ]);
    }

    public function unlike(Request $request)
    {
        $AuthUser = User::where('id', Auth::user()->id)->first();
        $comment = Comment::where('id', $request->comment_id)->first();
        Like::remove($comment, $AuthUser);

        return response()->json([
            'message' => 'You have unliked this Comment',
        ]);
    }

    public function bookmark(Request $request)
    {
        $AuthUser = User::where('id', Auth::user()->id)->first();
        $comment = Comment::where('id', $request->comment_id)->first();
        Bookmark::add($comment, $AuthUser);

        return response()->json([
            'message' => 'You have bookmarked this Comment',
        ]);
    }

    public function unBookMark(Request $request)
    {
        $AuthUser = User::where('id', Auth::user()->id)->first();
        $comment = Comment::where('id', $request->comment_id)->first();
        Bookmark::remove($comment, $AuthUser);

        return response()->json([
            'message' => 'You have unbookmarked this Comment',
        ]);
    }
}
