<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Reply;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class ReplyController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'comment_id' => 'required|exists:comments,id',
            'content' => 'required|max:255',
        ]);

        $reply = new Reply([
            'user_id' => Auth::id(),
            'comment_id' => $request->input('comment_id'),
            'content' => $request->input('content'),
        ]);

        $reply->save();

        return response()->json($reply, 201);
    }

    public function show(Reply $reply)
    {
        $reply = $reply->load(['user', 'comment.sweet']);
        return response()->json($reply);
    }

    public function update(Request $request, Reply $reply)
    {
        $this->authorize('update', $reply);

        $request->validate([
            'content' => 'required|max:255',
        ]);

        $reply->update([
            'content' => $request->input('content'),
        ]);

        return response()->json($reply);
    }

    public function destroy(Reply $reply)
    {
        $this->authorize('delete', $reply);

        $reply->delete();

        return response()->json(['message' => 'Reply deleted successfully']);
    }
}
