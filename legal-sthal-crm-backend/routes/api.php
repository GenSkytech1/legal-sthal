<?php
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Lead\MetaWebhookController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

Route::get('/webhooks/meta', [MetaWebhookController::class, 'verify']);
Route::post('/webhooks/meta', [MetaWebhookController::class, 'handle']);