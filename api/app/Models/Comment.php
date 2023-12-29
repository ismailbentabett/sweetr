<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Maize\Markable\Markable;
use Maize\Markable\Models\Bookmark;
use Maize\Markable\Models\Like;

class Comment extends Model
{
    use HasFactory;
    use Markable;

    protected $fillable = ['content'];

    protected static $marks = [
        Like::class,
        Bookmark::class,
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function sweet()
    {
        return $this->belongsTo(Sweet::class);
    }

    public function replies()
    {
        return $this->hasMany(Reply::class);
    }
}
