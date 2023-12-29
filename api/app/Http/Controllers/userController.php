<?php

namespace App\Http\Controllers;

use App\Models\User;

class userController extends Controller
{
    public function index()
    {
        $users = User::all();

        return response()->json([
            'users' => $users,
        ]);
    }

    public function show($id)
    {
        $user = User::where('id', $id)->first();

        return response()->json([
            'user' => $user,
        ]);
    }

    //is folloing me or am i folling him
    public function isFollowing($id)
    {
        $user = User::find($id);
        $authUser = User::find(auth()->user()->id);

        $isFollowint = $authUser->isFollowing($user);

        return response()->json([
            'isFollowing' => $isFollowint,
        ]);
    }

    public function isFollower($id)
    {
        $user = User::find($id);
        $authUser = User::find(auth()->user()->id);

        $isFollower = $authUser->isFollower($user);

        return response()->json([
            'isFollower' => $isFollower,
        ]);
    }

    public function isFollowedBy($followeeId, $followerId)
    {
        $followee = User::find($followeeId);
        $follower = User::find($followerId);

        $isFollowedBy = $followee->isFollowedBy($follower);

        return response()->json([
            'isFollowedBy' => $isFollowedBy,
        ]);
    }
}
