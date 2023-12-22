<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Sweet;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SweetController extends Controller
{
    public function index()
    {
        $sweets = Sweet::with('user')->latest()->get();

        return response()->json($sweets);
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

        return response()->json($sweet);
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
