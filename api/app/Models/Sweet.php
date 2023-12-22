<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Maize\Markable\Markable;
use Maize\Markable\Models\Like;
use Maize\Markable\Models\Bookmark;


class Sweet extends Model
{
    use HasFactory;
    use Markable;
    protected $fillable = ['content'];

    protected static $marks = [
        Like::class,
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
