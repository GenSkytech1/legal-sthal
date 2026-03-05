<?php
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Lead\MetaWebhookController;
use App\Http\Controllers\Api\CompanySettingController;
use App\Http\Controllers\WebsiteContentController;
use App\Http\Controllers\CustomPageController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/company-settings', [CompanySettingController::class, 'index']);
Route::get('/website-content', [WebsiteContentController::class, 'index']);
Route::get('/custom-pages', [CustomPageController::class, 'index']);
Route::get('/custom-pages/{id}', [CustomPageController::class, 'show']);
Route::get('/custom-pages/slug/{slug}', [CustomPageController::class, 'findBySlug']);

Route::middleware(['jwt.cookie', 'auth:api'])->group(function () {
    Route::post('/website-content', [WebsiteContentController::class, 'store']);
    Route::post('/company-settings', [CompanySettingController::class, 'store']);
    
    Route::post('/custom-pages', [CustomPageController::class, 'store']);
    Route::post('/custom-pages/{id}', [CustomPageController::class, 'update']);
    Route::delete('/custom-pages/{id}', [CustomPageController::class, 'destroy']);
    
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
});

Route::get('/webhooks/meta', [MetaWebhookController::class, 'verify']);
Route::post('/webhooks/meta', [MetaWebhookController::class, 'handle']);
