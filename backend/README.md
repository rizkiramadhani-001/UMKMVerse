# UMKMVerse Backend API

This README documents the available API endpoints in this Laravel backend and how to use them. It covers authentication, role-protected dashboards, and profile creation endpoints for roles: UMKM, Investor, Supplier, and Distributor.

## Authentication

### Register
- URL: `POST /api/register`
- Body (application/json):
  - `name` (string, required)
  - `email` (string, required, unique)
  - `password` (string, required) — must be confirmed in `password_confirmation`
  - `role` (string, required) — one of `user`, `admin`

- Response (201):
  - `message` — success message
  - `token` — Sanctum API token (plain text)

Example curl (PowerShell):
```
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"Secret123!","password_confirmation":"Secret123!","role":"user"}'
```

### Login
- URL: `POST /api/login`
# UMKMVerse Backend — API Usage & Responses

This document explains how to use the backend API and shows the exact JSON responses returned by the current controller implementations.

Base URL (local)
- http://localhost:8000/api

Quick setup (local)
- composer install
- copy `.env.example` → `.env` and configure DB
- php artisan key:generate
- php artisan migrate
- php artisan storage:link (optional, to serve uploaded files)
- php artisan serve

---
1) Authentication
---

POST /api/register
- Request (application/json):
  - name (string)
  - email (string)
  - password (string)
  - password_confirmation (string)
  - role (string) — `user` or `admin`

- Success response (201) — exact format returned by `AuthController::register` on success:

```json
{
  "message": "User registered and logged in successfully!",
  "token": "<plain-text-token>"
}
```

- Validation errors return 422 with structure:

```json
{ "error": { "field": ["error message"] } }
```

POST /api/login
- Request (application/json):
  - email
  - password

- Success response (200) — exact format returned by `AuthController::login`:

```json
{
  "message": "Login successful",
  "token": "<plain-text-token>"
}
```

- Unauthorized credentials return 401:

```json
{ "error": "Unauthorized" }
```

GET /api/user
- Requires header: `Authorization: Bearer <TOKEN>`
- Returns the authenticated user object (fields depend on `User` model). Example:

```json
{
  "id": 1,
  "name": "Alice",
  "email": "alice@example.com",
  "role": "user",
  "created_at": "2025-10-21T12:00:00.000000Z",
  "updated_at": "2025-10-21T12:00:00.000000Z"
}
```

---
2) Dashboards (role-protected)
---
These are simple routes that return the authenticated user; they are protected with `HasRole` middleware in routes. Current routes file defines:

- GET /api/admin/dashboard (HasRole:admin)
- GET /api/umkm/dashboard (HasRole:umkm)
- GET /api/investor/dashboard (HasRole:investor)
- GET /api/supplier/dashboard (HasRole:supplier)
- GET /api/supplier/dashboard (HasRole:distributor)  <-- likely a copy/paste issue; should be `/api/distributor/dashboard`

Each returns the authenticated user as JSON.

---
3) Profiles & file uploads (UMKM, Investor, Supplier, Distributor)
---
All profile create endpoints require `Authorization: Bearer <TOKEN>` and accept multipart/form-data.

Common form fields (multipart):
- thumbnail (file, required) — image, max 2MB
- video_profile (file, optional) — video/mp4 or quicktime, max ~50MB
- pdf (file, optional) — pdf, max 10MB
- name (string, required)
- description (string, required)

Validation rules are defined in `app/Http/Requests/ProfileStoreRequest.php` and `app/Http/Requests/UMKMStoreRequest.php`.

3.1 Create UMKM
- POST /api/umkm
- Controller: `UMKMController::store`
- Stores files using `$request->file(...)->store(...)` and creates a `UMKM` model.

- Success response (201):
```json
{
  "data": {
    "id": 10,
    "user_id": 2,
    "thumbnail": "uploads/thumbnails/abc123.jpg",
    "name": "My UMKM",
    "description": "Description here",
    "video_profile_url": "uploads/video/vid.mp4",
    "pdf_url": "uploads/pdf/doc.pdf",
    "created_at": "2025-10-21T12:34:56.000000Z",
    "updated_at": "2025-10-21T12:34:56.000000Z"
  }
}
```

3.2 UMKM profileUpload helper
- POST /api/umkm/profileUpload
- Expects `file_upload` plus other required fields (per controller implementation). It stores uploaded file under `uploads/video` and returns metadata.

- Exact success response:
```json
{
  "message": {
    "data": "success",
    "file_upload": {
      "name": "video.mp4",
      "mime": "video/mp4",
      "size": 1234567
    }
  }
}
```

3.3 Create Investor
- POST /api/investor
- Controller: `InvestorController::store` (uses `ProfileStoreRequest`)
- Success response (201): similar to UMKM but with the `investors` model data in `data`:

```json
{
  "data": {
    "id": 7,
    "user_id": 3,
    "thumbnail": "uploads/thumbnails/def456.jpg",
    "name": "Investor Name",
    "description": "Investor description",
    "video_profile_url": "uploads/video/ivideo.mp4",
    "pdf_url": "uploads/pdf/iinv.pdf",
    "created_at": "2025-10-21T12:35:00.000000Z",
    "updated_at": "2025-10-21T12:35:00.000000Z"
  }
}
```

3.4 Create Supplier
- POST /api/supplier
- Controller: `SupplierController::store`
- Response structure identical to Investor example but for `suppliers` model.

3.5 Create Distributor
- POST /api/distributor
- Controller: `DistributorController::store`
- Response structure identical to Investor example but for `distributors` model.

---
4) Notes & tips
---
- Files are stored with the default disk (usually `storage/app`). To make them web-accessible run:

```powershell
php artisan storage:link
```

- To return public URLs in responses, change controllers to wrap stored paths with `Storage::url($path)` before returning.

- The `investors`, `suppliers`, and `distributors` models were added but you may need to create migrations to persist those tables.

- If you want an OpenAPI/Swagger spec, I can generate one based on these routes and controllers.

---
5) Examples (PowerShell/curl)
---
Register and get token:
```powershell
curl -X POST http://localhost:8000/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"Secret123!","password_confirmation":"Secret123!","role":"user"}'
```

Login and get token:
```powershell
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"Secret123!"}'
```

Create a profile (UMKM example):
```powershell
curl -X POST http://localhost:8000/api/umkm \
  -H "Authorization: Bearer <TOKEN>" \
  -F "thumbnail=@C:\path\to\thumb.jpg" \
  -F "video_profile=@C:\path\to\video.mp4" \
  -F "pdf=@C:\path\to\doc.pdf" \
  -F "name=Profile Name" \
  -F "description=Profile description"
```
