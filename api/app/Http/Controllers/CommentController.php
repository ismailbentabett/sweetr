<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'sweet_id' => 'required|exists:sweets,id',
            'content' => 'required|max:255',
        ]);

        $comment = new Comment([
            'user_id' => Auth::id(),
            'sweet_id' => $request->input('sweet_id'),
            'content' => $request->input('content'),
        ]);

        $comment->save();

        return response()->json($comment, 201);
    }

    public function show(Comment $comment)
    {
        $comment = $comment->load(['user', 'sweet', 'replies.user']);

        return response()->json($comment);
    }

    public function update(Request $request, Comment $comment)
    {
        $this->authorize('update', $comment);

        $request->validate([
            'content' => 'required|max:255',
        ]);

        $comment->update([
            'content' => $request->input('content'),
        ]);

        return response()->json($comment);
    }

    public function destroy(Comment $comment)
    {
        $this->authorize('delete', $comment);

        $comment->delete();

        return response()->json(['message' => 'Comment deleted successfully']);
    }
}
