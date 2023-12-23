<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
}
