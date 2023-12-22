<?php

use App\Http\Controllers\Api\SweetController;
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


Route::middleware(['auth:api'])->group(function () {
    Route::prefix('sweets')->group(function () {
        Route::get('/', [SweetController::class, 'index']);
        Route::post('/', [SweetController::class, 'store']);
        Route::get('/{sweet}', [SweetController::class, 'show']);
        Route::put('/{sweet}', [SweetController::class, 'update']);
        Route::delete('/{sweet}', [SweetController::class, 'destroy']);
    });
});
