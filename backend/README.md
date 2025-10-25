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


# UMKM API Documentation

## Overview

This API provides endpoints for managing UMKM (Usaha Mikro, Kecil, dan Menengah) profiles, including file uploads for logos, product photos, and pitch videos.

## Base URL

```
http://your-domain.com/api
```

## Authentication

All UMKM endpoints require authentication using Laravel Sanctum. Include the bearer token in the Authorization header:

```
Authorization: Bearer {your-token}
```

### Getting a Token

**Login Endpoint:**
```http
POST /api/login
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "your-password"
}
```

**Response:**
```json
{
  "token": "1|abcdef123456...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

---

## Endpoints

### 1. Create UMKM Profile

Creates a new UMKM profile with optional file uploads.

**Endpoint:**
```http
POST /api/umkm
```

**Headers:**
```
Authorization: Bearer {your-token}
Content-Type: multipart/form-data
```

**Request Parameters:**

| Field | Type | Required | Max Size | Description |
|-------|------|----------|----------|-------------|
| `namaUmkm` | string | Yes | 255 chars | UMKM business name |
| `nib` | string | No | 100 chars | Business Identification Number |
| `bidangUsaha` | string | No | 255 chars | Business sector/field |
| `email` | email | No | 255 chars | Contact email |
| `phone` | string | No | 50 chars | Contact phone number |
| `website` | string | No | 255 chars | Website URL |
| `lokasiUsaha` | string | No | 255 chars | Business location |
| `alamatLengkap` | text | No | - | Full address |
| `deskripsiSingkat` | text | No | - | Short description |
| `deskripsiLengkap` | text | No | - | Full description |
| `visiMisi` | text | No | - | Vision and mission |
| `targetPasar` | string | No | 255 chars | Target market |
| `keunggulanProduk` | text | No | - | Product advantages |
| `videoPitchUrl` | file | No | 20MB | Video pitch (mp4, mov, avi) |
| `minInvestasi` | numeric | No | - | Minimum investment |
| `targetInvestasi` | numeric | No | - | Target investment |
| `logo` | file | No | 4MB | Company logo (jpg, jpeg, png) |
| `fotoProduk[]` | file[] | No | 4MB each | Product photos (jpg, jpeg, png) |

**Example Request (using cURL):**

```bash
curl -X POST http://your-domain.com/api/umkm \
  -H "Authorization: Bearer 1|abcdef123456..." \
  -H "Content-Type: multipart/form-data" \
  -F "namaUmkm=Toko Kue Manis" \
  -F "nib=1234567890" \
  -F "bidangUsaha=Kuliner" \
  -F "email=tokokuemanis@example.com" \
  -F "phone=081234567890" \
  -F "website=https://tokokuemanis.com" \
  -F "lokasiUsaha=Jakarta" \
  -F "alamatLengkap=Jl. Manis No. 123, Jakarta Selatan" \
  -F "deskripsiSingkat=Toko kue artisan dengan resep turun temurun" \
  -F "deskripsiLengkap=Kami adalah toko kue yang sudah berdiri sejak 2010..." \
  -F "visiMisi=Menjadi toko kue terbaik di Indonesia" \
  -F "targetPasar=B2C, B2B" \
  -F "keunggulanProduk=Bahan premium, resep turun temurun" \
  -F "minInvestasi=50000000" \
  -F "targetInvestasi=200000000" \
  -F "logo=@/path/to/logo.png" \
  -F "fotoProduk[]=@/path/to/product1.jpg" \
  -F "fotoProduk[]=@/path/to/product2.jpg" \
  -F "videoPitchUrl=@/path/to/pitch.mp4"
```

**Example Request (using JavaScript/Axios):**

```javascript
const formData = new FormData();
formData.append('namaUmkm', 'Toko Kue Manis');
formData.append('nib', '1234567890');
formData.append('bidangUsaha', 'Kuliner');
formData.append('email', 'tokokuemanis@example.com');
formData.append('phone', '081234567890');
formData.append('website', 'https://tokokuemanis.com');
formData.append('lokasiUsaha', 'Jakarta');
formData.append('alamatLengkap', 'Jl. Manis No. 123, Jakarta Selatan');
formData.append('deskripsiSingkat', 'Toko kue artisan dengan resep turun temurun');
formData.append('minInvestasi', 50000000);
formData.append('targetInvestasi', 200000000);
formData.append('logo', logoFile); // File object from input
formData.append('fotoProduk[]', productPhoto1);
formData.append('fotoProduk[]', productPhoto2);
formData.append('videoPitchUrl', videoFile);

axios.post('http://your-domain.com/api/umkm', formData, {
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'multipart/form-data'
  }
})
.then(response => console.log(response.data))
.catch(error => console.error(error));
```

**Success Response (201 Created):**

```json
{
  "message": "UMKM berhasil disimpan",
  "data": {
    "id": 1,
    "namaUmkm": "Toko Kue Manis",
    "nib": "1234567890",
    "bidangUsaha": "Kuliner",
    "email": "tokokuemanis@example.com",
    "phone": "081234567890",
    "website": "https://tokokuemanis.com",
    "lokasiUsaha": "Jakarta",
    "alamatLengkap": "Jl. Manis No. 123, Jakarta Selatan",
    "deskripsiSingkat": "Toko kue artisan dengan resep turun temurun",
    "deskripsiLengkap": "Kami adalah toko kue yang sudah berdiri sejak 2010...",
    "visiMisi": "Menjadi toko kue terbaik di Indonesia",
    "targetPasar": "B2C, B2B",
    "keunggulanProduk": "Bahan premium, resep turun temurun",
    "videoPitchUrl": "uploads/video/abc123.mp4",
    "minInvestasi": 50000000,
    "targetInvestasi": 200000000,
    "logo": "uploads/logo/xyz789.png",
    "fotoProduk": "[\"uploads/foto_produk/prod1.jpg\",\"uploads/foto_produk/prod2.jpg\"]",
    "created_at": "2025-10-25T10:30:00.000000Z",
    "updated_at": "2025-10-25T10:30:00.000000Z"
  }
}
```

**Error Response (422 Unprocessable Entity):**

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "namaUmkm": [
      "The nama umkm field is required."
    ],
    "email": [
      "The email must be a valid email address."
    ],
    "logo": [
      "The logo must be an image.",
      "The logo must not be greater than 4096 kilobytes."
    ]
  }
}
```

---

### 2. Get UMKM Profile

Retrieves a specific UMKM profile by ID.

**Endpoint:**
```http
GET /api/umkm/{id}
```

**Headers:**
```
Authorization: Bearer {your-token}
```

**URL Parameters:**
- `id` (integer, required): UMKM profile ID

**Example Request:**

```bash
curl -X GET http://your-domain.com/api/umkm/1 \
  -H "Authorization: Bearer 1|abcdef123456..."
```

**Success Response (200 OK):**

```json
{
  "id": 1,
  "namaUmkm": "Toko Kue Manis",
  "nib": "1234567890",
  "bidangUsaha": "Kuliner",
  "email": "tokokuemanis@example.com",
  "phone": "081234567890",
  "website": "https://tokokuemanis.com",
  "lokasiUsaha": "Jakarta",
  "alamatLengkap": "Jl. Manis No. 123, Jakarta Selatan",
  "deskripsiSingkat": "Toko kue artisan dengan resep turun temurun",
  "deskripsiLengkap": "Kami adalah toko kue yang sudah berdiri sejak 2010...",
  "visiMisi": "Menjadi toko kue terbaik di Indonesia",
  "targetPasar": "B2C, B2B",
  "keunggulanProduk": "Bahan premium, resep turun temurun",
  "videoPitchUrl": "uploads/video/abc123.mp4",
  "minInvestasi": 50000000,
  "targetInvestasi": 200000000,
  "logo": "uploads/logo/xyz789.png",
  "fotoProduk": "[\"uploads/foto_produk/prod1.jpg\",\"uploads/foto_produk/prod2.jpg\"]",
  "created_at": "2025-10-25T10:30:00.000000Z",
  "updated_at": "2025-10-25T10:30:00.000000Z"
}
```

**Error Response (404 Not Found):**

```json
{
  "message": "No query results for model [App\\Models\\UMKM] 999"
}
```

---

### 3. Update UMKM Profile

Updates an existing UMKM profile.

**Endpoint:**
```http
PUT /api/umkm/{id}
```

**Headers:**
```
Authorization: Bearer {your-token}
Content-Type: application/json
```

**URL Parameters:**
- `id` (integer, required): UMKM profile ID

**Request Body:**

```json
{
  "namaUmkm": "Toko Kue Manis Premium",
  "phone": "081234567899",
  "deskripsiSingkat": "Toko kue artisan premium dengan resep turun temurun",
  "targetInvestasi": 300000000
}
```

**Example Request:**

```bash
curl -X PUT http://your-domain.com/api/umkm/1 \
  -H "Authorization: Bearer 1|abcdef123456..." \
  -H "Content-Type: application/json" \
  -d '{
    "namaUmkm": "Toko Kue Manis Premium",
    "phone": "081234567899",
    "targetInvestasi": 300000000
  }'
```

**Success Response (200 OK):**

```json
{
  "message": "UMKM berhasil diperbarui",
  "data": {
    "id": 1,
    "namaUmkm": "Toko Kue Manis Premium",
    "nib": "1234567890",
    "bidangUsaha": "Kuliner",
    "email": "tokokuemanis@example.com",
    "phone": "081234567899",
    "website": "https://tokokuemanis.com",
    "lokasiUsaha": "Jakarta",
    "alamatLengkap": "Jl. Manis No. 123, Jakarta Selatan",
    "deskripsiSingkat": "Toko kue artisan premium dengan resep turun temurun",
    "deskripsiLengkap": "Kami adalah toko kue yang sudah berdiri sejak 2010...",
    "visiMisi": "Menjadi toko kue terbaik di Indonesia",
    "targetPasar": "B2C, B2B",
    "keunggulanProduk": "Bahan premium, resep turun temurun",
    "videoPitchUrl": "uploads/video/abc123.mp4",
    "minInvestasi": 50000000,
    "targetInvestasi": 300000000,
    "logo": "uploads/logo/xyz789.png",
    "fotoProduk": "[\"uploads/foto_produk/prod1.jpg\",\"uploads/foto_produk/prod2.jpg\"]",
    "created_at": "2025-10-25T10:30:00.000000Z",
    "updated_at": "2025-10-25T11:45:00.000000Z"
  }
}
```

---

### 4. Delete UMKM Profile

Deletes a UMKM profile.

**Endpoint:**
```http
DELETE /api/umkm/{id}
```

**Headers:**
```
Authorization: Bearer {your-token}
```

**URL Parameters:**
- `id` (integer, required): UMKM profile ID

**Example Request:**

```bash
curl -X DELETE http://your-domain.com/api/umkm/1 \
  -H "Authorization: Bearer 1|abcdef123456..."
```

**Success Response (200 OK):**

```json
{
  "message": "UMKM berhasil dihapus"
}
```

**Error Response (404 Not Found):**

```json
{
  "message": "No query results for model [App\\Models\\UMKM] 999"
}
```

---

## File Storage

Uploaded files are stored in the following directories:

- **Logos:** `storage/app/public/uploads/logo/`
- **Videos:** `storage/app/public/uploads/video/`
- **Product Photos:** `storage/app/public/uploads/foto_produk/`

To access uploaded files via URL, ensure you have created the symbolic link:

```bash
php artisan storage:link
```

Files will be accessible at:
```
http://your-domain.com/storage/uploads/logo/filename.png
http://your-domain.com/storage/uploads/video/filename.mp4
http://your-domain.com/storage/uploads/foto_produk/filename.jpg
```

---

## Error Codes

| Status Code | Description |
|-------------|-------------|
| 200 | Success |
| 201 | Created |
| 401 | Unauthorized (missing or invalid token) |
| 404 | Not Found |
| 422 | Unprocessable Entity (validation error) |
| 500 | Internal Server Error |

---

## Notes

1. **Authentication Required:** All UMKM endpoints require a valid bearer token.
2. **File Upload Limits:**
   - Logo: Max 4MB (jpg, jpeg, png)
   - Video: Max 20MB (mp4, mov, avi)
   - Product Photos: Max 4MB each (jpg, jpeg, png)
3. **Product Photos Array:** Multiple photos can be uploaded using `fotoProduk[]` field.
4. **JSON Format:** The `fotoProduk` field is stored as JSON-encoded array in the database.
5. **Numeric Fields:** `minInvestasi` and `targetInvestasi` accept numeric values (integers or decimals).

---

## Testing with Postman

### Setup
1. Import the collection or create a new request
2. Set the Authorization type to "Bearer Token"
3. Add your token in the Token field

### Creating UMKM
1. Set method to POST
2. URL: `http://your-domain.com/api/umkm`
3. Go to Body tab → form-data
4. Add fields as key-value pairs
5. For files, change the type dropdown to "File" and select the file

### Testing File Downloads
After creating a UMKM profile, test file access by opening:
```
http://your-domain.com/storage/uploads/logo/{filename}
```

---

## Example Frontend Integration (React)

```jsx
import React, { useState } from 'react';
import axios from 'axios';

function UMKMForm() {
  const [formData, setFormData] = useState({
    namaUmkm: '',
    email: '',
    phone: '',
    // ... other fields
  });
  
  const [files, setFiles] = useState({
    logo: null,
    videoPitchUrl: null,
    fotoProduk: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    
    // Append text fields
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });
    
    // Append files
    if (files.logo) data.append('logo', files.logo);
    if (files.videoPitchUrl) data.append('videoPitchUrl', files.videoPitchUrl);
    
    files.fotoProduk.forEach((file, index) => {
      data.append('fotoProduk[]', file);
    });
    
    try {
      const response = await axios.post(
        'http://your-domain.com/api/umkm',
        data,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      
      console.log('Success:', response.data);
      alert('UMKM profile created successfully!');
    } catch (error) {
      console.error('Error:', error.response?.data);
      alert('Failed to create UMKM profile');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields here */}
    </form>
  );
}

export default UMKMForm;
```

---

## Support

For additional support or questions, please contact the development team or refer to the Laravel documentation at https://laravel.com/docs


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


