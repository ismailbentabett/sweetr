<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\SweetResource;
use App\Models\Sweet;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SweetController extends Controller
{
    public function index()
    {
        $sweets = Sweet::with('user')->latest()->get();

        return SweetResource::collection($sweets);
    }
    public function userSweets($id)
    {
        $sweets = Sweet::where('user_id', $id)->latest('created_at')->get();
        return SweetResource::collection($sweets);
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

    public function destroy($id)
    {
        $sweet = Sweet::find($id);
        $sweet->delete();
        return response()->json(['message' => 'Sweet deleted successfully']);
    }
}
