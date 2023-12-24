<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\ReplyController;
use App\Http\Controllers\SweetController;
use App\Http\Controllers\userInteractionsController;
use App\Http\Controllers\sweetInteractionsController;
use App\Http\Controllers\userController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});

// routes/api.php


Route::middleware(['auth:sanctum'])->group(function () {
    Route::prefix('sweets')->group(function () {
        Route::get('/', [SweetController::class, 'index']);
        Route::get('/my', [SweetController::class, 'mySweets']);
        Route::get('/user/{id}', [SweetController::class, 'userSweets']);
        Route::post('/', [SweetController::class, 'store']);
        Route::get('/{sweet}', [SweetController::class, 'show']);
        Route::put('/{sweet}', [SweetController::class, 'update']);
        Route::delete('/{sweet}', [SweetController::class, 'destroy']);

        Route::post('/like/{id}', [sweetInteractionsController::class, 'like']);
        Route::post('/unlike/{id}', [sweetInteractionsController::class, 'unlike']);
        Route::post('/bookmark/{id}', [sweetInteractionsController::class, 'bookmark']);
        Route::post('unbookmark/{id}', [sweetInteractionsController::class, 'unBookMark']);
    });
    Route::prefix('comments')->group(function () {
        Route::post('/', [CommentController::class, 'store']);
        Route::get('/{comment}', [CommentController::class, 'show']);
        Route::put('/{comment}', [CommentController::class, 'update']);
        Route::delete('/{comment}', [CommentController::class, 'destroy']);
    });

    Route::prefix('replies')->group(function () {
        Route::post('/', [ReplyController::class, 'store']);
        Route::get('/{reply}', [ReplyController::class, 'show']);
        Route::put('/{reply}', [ReplyController::class, 'update']);
        Route::delete('/{reply}', [ReplyController::class, 'destroy']);
    });

    Route::prefix('user')->group(function () {
        Route::post('/follow', [userInteractionsController::class, 'follow']);
        Route::post('/unfollow', [userInteractionsController::class, 'unfollow']);
        Route::post('/block', [userInteractionsController::class, 'blockUser']);
        Route::post('/unblock', [userInteractionsController::class, 'unblockUser']);
        Route::get('/{id}', [userController::class, 'show']);
    });
});
