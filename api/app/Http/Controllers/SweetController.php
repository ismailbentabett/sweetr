<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\SweetResource;
use App\Models\Sweet;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Maize\Markable\Models\Bookmark;
use Maize\Markable\Models\Like;

class SweetController extends Controller
{
    public function index()
    {
        $sweets = Sweet::with('user')->latest()->get();

        return new SweetResource($sweets);
    }
    public function userSweets($id)
    {
        $sweets = Sweet::where('user_id', $id)->latest()->get();
        $id = Auth::user()->id;

        $user = User::where('id', $id)->first();

        foreach ($sweets as $sweet) {
            $sweet->liked =  Like::has($sweet, $user);
            $sweet->likes_count = Like::count($sweet);
            $sweet->bookmarked = Bookmark::has($sweet, $user);
        }

        return response()->json($sweets->load('user'));
    }

    public function mySweets()
    {
        $sweets = Sweet::where('user_id', Auth::user()->id)->with('user')->latest()->get();

        return new SweetResource($sweets);
    }

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|max:255',
        ]);

        $user = User::find(Auth::user()->id);

        $sweet = $user->sweets()->create([
            'content' => $request->input('content'),
        ]);

        return response()->json($sweet, 201);
    }

    public function show(Sweet $sweet)
    {
        $sweet = $sweet->load('user');

        return new SweetResource($sweet);
    }

    public function update(Request $request, Sweet $sweet)
    {
        $request->validate([
            'content' => 'required|max:255',
        ]);

        $this->authorize('update', $sweet);

        $sweet->update([
            'content' => $request->input('content'),
        ]);

        return response()->json($sweet);
    }

    public function destroy(Sweet $sweet)
    {
        $this->authorize('delete', $sweet);

        $sweet->delete();

        return response()->json(['message' => 'Sweet deleted successfully']);
    }
}
