# M3 FOTO — Architecture

## Principles

1. **One content contract.** Zod schemas in `src/lib/schemas/content.ts` define every editable
   thing. The local content files (M1), the admin forms and the database JSON validation (M5)
   all use the same schemas.
2. **One data boundary.** Components never import content. Pages call async functions in
   `src/lib/data/*`. Swapping the local files for Supabase changes only that folder.
3. **Media modelled once.** Every image is a `MediaAsset` (path, dimensions, blur preview, alt,
   focal point, credit). Portfolio, services, homepage and future client galleries all reference
   media by id.
4. **Motion is progressive.** Content is server-rendered and readable without JavaScript and
   under `prefers-reduced-motion`. Animation only enhances it.

## Request flow (M1)

```
page.tsx (Server Component, static)
  → lib/data/content.ts  (validates content with zod at build; throws on broken references)
  → typed props
  → section components (client only where they animate)
```

All public pages are statically generated. In M5 they become ISR pages revalidated by tag
when the admin publishes (`revalidateTag("home")`, `revalidateTag("portfolio")`, …).

## Planned Supabase schema (M5 — design only, nothing created yet)

```sql
-- Identity & roles
profiles (id uuid pk → auth.users, full_name, role text check (role in ('owner','editor','viewer')), created_at)

-- Media
media (id uuid pk, bucket text, path text, width int, height int, blur_data_url text,
       alt text, focal text default '50% 50%', credit jsonb, is_placeholder bool default false,
       uploaded_by uuid → profiles, created_at)

-- Portfolio
categories (id, slug unique, title, layout text, sort int, visible bool)
collections (id, slug unique, title, category_id → categories, description, cover_id → media,
             featured bool, sort int, status text check (status in ('draft','published')), published_at)
collection_media (collection_id, media_id, sort int, pk (collection_id, media_id))
projects (id, slug unique, title, category_id, summary, story jsonb, location, year, cover_id,
          featured bool, sort int, status, seo jsonb, published_at)
project_media (project_id, media_id, sort int, layout_hint text)

-- Services & packages
services (id, slug unique, title, short, body jsonb, hero_id → media, process jsonb, sort, visible)
service_media (service_id, media_id, sort)
packages (id, slug, service_id, name, description, deliverables jsonb,
          price_amount numeric null, price_label text null, currency text default 'INR',
          active bool, sort)
addons (id, name, description, price_amount numeric null, active bool)
package_addons (package_id, addon_id)

-- Enquiries
inquiries (id, name, email, phone, event_type, event_date date, location, service_id, package_id,
           budget_range, message, status text check (status in ('new','contacted','proposal','confirmed','completed','archived')),
           follow_up_on date, source text, consent bool, ip_hash text, created_at)
inquiry_attachments (id, inquiry_id, path)               -- private bucket
inquiry_notes (id, inquiry_id, author_id, body, created_at)

-- Site content
testimonials (id, quote, attribution, context, image_id, published bool, sort)
site_settings (key text pk, value jsonb, updated_by, updated_at)   -- validated by siteSettingsSchema
page_content (page text, section text, value jsonb, visible bool, sort int, pk (page, section))
activity_log (id, actor_id, action, entity, entity_id, details jsonb, created_at)
```

Row-level security outline:
- `anon`: `select` on published collections/projects/services/packages/testimonials/media
  referenced by them, `site_settings`, `page_content`; `insert` on `inquiries` only (through a
  server action that validates, rate-limits and verifies Turnstile).
- `authenticated` staff: by role — viewers read, editors write content, owners also manage
  users, settings and deletes.
- Storage: `public-media` bucket (optimised derivatives), `originals` and `inquiry-uploads`
  buckets private, accessed via signed URLs.

## Future client experience (designed, not built)

```
clients (id, user_id → auth.users null, name, email, phone)
galleries (id, client_id, project_id null, title, slug, cover_id, status,
           password_hash null, expires_at null, allow_download bool, allow_selection bool,
           selection_limit int null)
gallery_media (gallery_id, media_id, sort)
gallery_access (gallery_id, client_id | email, role ('viewer','selector'), invited_at, last_seen_at)
selections (id, gallery_id, client_id, media_id, kind ('favourite','final'), note, created_at)
downloads (id, gallery_id, media_id null, client_id, size ('web','full'), created_at)  -- audit
bookings (id, inquiry_id, client_id, package_id, event_date, status, total_amount)
payments (id, booking_id, provider, provider_ref, amount, status, paid_at)
invoices (id, booking_id, number, pdf_path, issued_at)
```

Why this works without a rewrite: galleries reuse `media`; access is a separate table so
password, invite-only and account-based access can coexist; downloads go through a server route
that checks `allow_download` and issues short-lived signed URLs from the private bucket.

## Security posture

- No secrets in the client bundle. Only `NEXT_PUBLIC_SITE_URL` and the placeholder-badge flag
  are public.
- Security headers in `next.config.ts` (nosniff, frame denial, referrer policy, permissions policy).
  A strict CSP is added in M5 once third-party scripts (Turnstile, analytics) are known.
- Images optimised only from allow-listed local paths (`images.localPatterns`).
