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

---
6) Forum (Threads & Posts)
---

The project includes a simple forum feature with `Thread` and `Post` resources.

Routes added:
- GET /api/threads — list threads
- GET /api/threads/{thread} — show a thread with its posts
- POST /api/threads — create a thread (auth required)
- PUT /api/threads/{thread} — update a thread (auth + owner)
- DELETE /api/threads/{thread} — delete a thread (auth + owner)

- GET /api/threads/{thread}/posts — list posts in thread
- POST /api/threads/{thread}/posts — create post in thread (auth required)
- PUT /api/threads/{thread}/posts/{post} — update post (auth + owner)
- DELETE /api/threads/{thread}/posts/{post} — delete post (auth + owner)

Example: list threads
```powershell
curl http://localhost:8000/api/threads
```

Example: show thread (includes posts)
```powershell
curl http://localhost:8000/api/threads/1
```

Example: create thread (authenticated)
```powershell
curl -X POST http://localhost:8000/api/threads \
  -H "Authorization: Bearer <TOKEN>" \
  -F "title=Hello forum" \
  -F "body=This is the first thread"
```

Create thread success response (201):
```json
{ "data": { "id": 1, "user_id": 2, "title": "Hello forum", "body": "This is the first thread", "created_at": "...", "updated_at": "..." } }
```

Example: create post in thread (authenticated)
```powershell
curl -X POST http://localhost:8000/api/threads/1/posts \
  -H "Authorization: Bearer <TOKEN>" \
  -F "body=Nice thread!"
```

Create post success response (201):
```json
{ "data": { "id": 1, "thread_id": 1, "user_id": 2, "body": "Nice thread!", "created_at": "...", "updated_at": "..." } }
```

Notes:
- Update/delete endpoints enforce ownership (only the creator can modify/delete).
- You can add pagination by modifying controllers to use `paginate()` instead of `get()`.

---
7) Chat (Private messages)
---

This project includes a light-weight private chat API for one-to-one conversations between users. All chat endpoints require authentication (`Authorization: Bearer <TOKEN>`) and only participants may access a chat's messages.

Endpoints

- GET /api/chats
  - Description: List chats for the authenticated user. Each chat includes `user_one_id`, `user_two_id`, timestamps and the latest message (if any).
  - Auth: required
  - Response (200) — array of chat objects. Example:

```json
[
  {
    "id": 5,
    "user_one_id": 2,
    "user_two_id": 3,
    "created_at": "2025-10-21T12:00:00.000000Z",
    "updated_at": "2025-10-21T12:00:00.000000Z",
    "messages": [ { /* latest message object */ } ],
    "user_one": { /* user object */ },
    "user_two": { /* user object */ }
  }
]
```

- POST /api/chats
  - Description: Create or find a chat between the authenticated user and `other_user_id`. The controller normalizes user order to avoid duplicates.
  - Body (application/json): `{ "other_user_id": 3 }`
  - Auth: required
  - Response (201):

```json
{ "data": { "id": 5, "user_one_id": 2, "user_two_id": 3, "created_at": "..." } }
```

- GET /api/chats/{chat}/messages
  - Description: List all messages in a chat (oldest -> newest). Only participants can access.
  - Auth: required
  - Response (200): array of message objects:

```json
[
  { "id": 1, "chat_id": 5, "sender_id": 2, "message": "Hi!", "read_at": null, "created_at": "..." },
  { "id": 2, "chat_id": 5, "sender_id": 3, "message": "Hello!", "read_at": "2025-10-21T12:10:00.000000Z", "created_at": "..." }
]
```

- POST /api/chats/{chat}/messages
  - Description: Send a message in a chat.
  - Body (application/json): `{ "message": "Hello there" }`
  - Auth: required
  - Response (201): `{ "data": { /* message object */ } }`

- POST /api/chats/{chat}/read
  - Description: Mark unread messages in the chat (those sent by the other participant) as read. Returns the number of rows updated.
  - Auth: required
  - Response (200): `{ "updated": 3 }`

- DELETE /api/chats/{chat}/messages/{message}
  - Description: Delete a message. Only the message sender can delete their message.
  - Auth: required
  - Response (200): `{ "deleted": true }`

Examples (PowerShell/curl)

Create or get a chat with user id 3:
```powershell
curl -X POST http://localhost:8000/api/chats \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"other_user_id":3}'
```

Send a message:
```powershell
curl -X POST http://localhost:8000/api/chats/5/messages \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello from API"}'
```

List messages for a chat:
```powershell
curl http://localhost:8000/api/chats/5/messages \
  -H "Authorization: Bearer <TOKEN>"
```

Notes & tips

- The controllers use simple participant checks to enforce access; you can replace these with Policies for a more idiomatic Laravel authorization approach.
- To add unread counts to the chat list, compute unread per-chat for the authenticated user and return it alongside the chat object.


