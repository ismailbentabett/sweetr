<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;

class userInteractionsController extends Controller
{
    //follow and unfollow
    public function follow(Request $request)
    {
        $AuthUser = User::where("id", Auth::user()->id)->first();
        $userTofollow = User::where("id", $request->user_id)->first();
        $AuthUser->follow($userTofollow);
        return response()->json([
            'message' => 'You are now following ' . $userTofollow->name,
        ]);
    }

    public function unfollow(Request $request)
    {
        $AuthUser = User::where('id', Auth::user()->id)->first();
        $userToUnfollow = User::where(
            'id',
            Auth::user()->id
        )->first();
        $AuthUser->unfollow($userToUnfollow);
        return response()->json([
            'message' => '
                You are no longer following ' . $userToUnfollow->name,
        ]);
    }

    //block and unblock
    public function blockUser(Request $request)
    {
        $AuthUser = User::where('id', Auth::user()->id)->first();
        $userToBlock = User::where('id', $request->user_id)->first();
        $AuthUser->block($userToBlock);
        return response()->json([
            'message' => 'You have blocked ' . $userToBlock->name,
        ]);
    }
    public function unblockUser(Request $request)
    {
        $AuthUser = User::where('id', Auth::user()->id)->first();
        $userToUnblock = User::where('id', $request->user_id)->first();
        $AuthUser->unblock($userToUnblock);
        return response()->json([
            'message' => ' You have unblocked ' . $userToUnblock->name,

        ]);
    }
}
