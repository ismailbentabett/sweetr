<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class userInteractionsController extends Controller
{
    //follow and unfollow
    public function follow($id)
    {
        $AuthUser = User::where('id', Auth::user()->id)->first();
        $userTofollow = User::where('id', $id)->first();
        $AuthUser->follow($userTofollow);
        $isFollowint = $AuthUser->isFollowing($userTofollow);

        return response()->json([
            'isFollowing' => $isFollowint,
        ]);
    }

    public function unfollow($id)
    {
        $AuthUser = User::where('id', Auth::user()->id)->first();
        $userToUnfollow = User::where(
            'id',
            $id
        )->first();

        $AuthUser->unfollow($userToUnfollow);

        $isFollowint = $AuthUser->isFollowing($userToUnfollow);

        return response()->json([
            'isFollowing' => $isFollowint,
        ]);
    }

    //block and unblock
    public function blockUser(Request $request)
    {
        $AuthUser = User::where('id', Auth::user()->id)->first();
        $userToBlock = User::where('id', $request->user_id)->first();
        $AuthUser->block($userToBlock);

        return response()->json([
            'message' => 'You have blocked '.$userToBlock->name,
        ]);
    }

    public function unblockUser(Request $request)
    {
        $AuthUser = User::where('id', Auth::user()->id)->first();
        $userToUnblock = User::where('id', $request->user_id)->first();
        $AuthUser->unblock($userToUnblock);

        return response()->json([
            'message' => ' You have unblocked '.$userToUnblock->name,

        ]);
    }
}
