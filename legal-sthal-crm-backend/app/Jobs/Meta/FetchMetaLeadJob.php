<?php

namespace App\Services\Meta;

use App\Models\Lead;
use Illuminate\Support\Facades\Http;

class FetchMetaLeadJob
{
    public function fetchAndStore(string $leadId): void
    {
        $response = Http::get(
            "https://graph.facebook.com/v19.0/{$leadId}",
            [
                'access_token' => config('services.meta.page_token'),
                'fields' => 'created_time,ad_id,ad_name,campaign_id,campaign_name,form_id,field_data',
            ]
        );

        if (!$response->successful()) {
            return;
        }

        $data = $response->json();

        $fields = collect($data['field_data'] ?? [])
            ->mapWithKeys(fn ($f) => [$f['name'] => $f['values'][0]]);

        Lead::updateOrCreate(
            [
                'source' => 'meta_ads',
                'platform_lead_id' => $leadId,
            ],
            [
                'campaign_id'   => $data['campaign_id'] ?? null,
                'campaign_name' => $data['campaign_name'] ?? null,
                'ad_id'         => $data['ad_id'] ?? null,
                'ad_name'       => $data['ad_name'] ?? null,
                'form_id'       => $data['form_id'] ?? null,
                'name'          => $fields['full_name'] ?? null,
                'email'         => $fields['email'] ?? null,
                'phone'         => $fields['phone_number'] ?? null,
                'custom_fields' => $fields,
                'raw_payload'   => $data,
            ]
        );
    }
}