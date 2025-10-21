# UMKMVerse Backend API

This README documents the available API endpoints in this Laravel backend and how to use them. It covers authentication and profile creation endpoints for roles: UMKM, Investor, Supplier, and Distributor.

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
- Body (application/json):
  - `email` (string, required)
  - `password` (string, required)

- Response (200):
  - `message` — success message
  - `token` — Sanctum API token

Example curl:
```
curl -X POST http://localhost:8000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"Secret123!"}'
```

## Protected: Get current user
- URL: `GET /api/user`
- Headers: `Authorization: Bearer <TOKEN>`
- Returns the authenticated user's information.

## Profile creation endpoints (file uploads)
All profile creation endpoints require authentication via Sanctum. Use the `Authorization: Bearer <TOKEN>` header.

Common fields (multipart/form-data):
- `thumbnail` (file, required) — image file (jpeg/png) max 2MB
- `video_profile` (file, optional) — video (mp4/quicktime) max ~50MB
- `pdf` (file, optional) — pdf file max 10MB
- `name` (string, required)
- `description` (string, required)

Responses: each creation endpoint returns the created resource in `data` with HTTP 201 status.

### Create UMKM
- URL: `POST /api/umkm`
- Controller: `UMKMController@store`
- Validation rules: see `app/Http/Requests/UMKMStoreRequest.php` (thumbnail required, name, description required, video/pdf optional)

Example (PowerShell):
```
curl -X POST http://localhost:8000/api/umkm \
  -H "Authorization: Bearer <TOKEN>" \
  -F "thumbnail=@C:\path\to\thumb.jpg" \
  -F "video_profile=@C:\path\to\video.mp4" \
  -F "pdf=@C:\path\to\doc.pdf" \
  -F "name=My UMKM" \
  -F "description=Description here"
```

### Create Investor
- URL: `POST /api/investor`
- Controller: `InvestorController@store`
- Validation: same as `ProfileStoreRequest`

### Create Supplier
- URL: `POST /api/supplier`
- Controller: `SupplierController@store`
- Validation: same as `ProfileStoreRequest`

### Create Distributor
- URL: `POST /api/distributor`
- Controller: `DistributorController@store`
- Validation: same as `ProfileStoreRequest`

## File storage notes
- Uploaded files are stored using Laravel's default filesystem (usually `storage/app`).
- To serve files publicly, run:

```powershell
php artisan storage:link
```

- To return public URLs from controllers, use `Storage::url($path)` before returning in the response.

## Database & Migrations
- This project contains migrations for `users` and `umkm`. The models `Investor`, `Supplier`, and `Distributor` were added but migrations for their tables may not exist. If you need tables for those models, create migrations (e.g. `create_investors_table`, `create_suppliers_table`, `create_distributors_table`) with columns similar to the `umkm` migration: `id`, `user_id` (foreign), `thumbnail`, `name`, `description`, `video_profile_url`, `pdf_url`, timestamps.

## Tests
- The project uses Pest for testing. Run tests with:

```powershell
php vendor/bin/pest
```

## Next steps / Suggestions
- Add migrations for investor/supplier/distributor tables if you intend to persist those resources.
- Add feature tests for the authenticated file upload endpoints.
- Return fully-qualified URLs for uploaded files in responses using `Storage::url()`.

If you'd like, I can add migrations and feature tests next — tell me which you'd prefer.
# UMKMVerse API Documentation

This is a simple Laravel API for user registration and login functionality, with support for role-based access control.

## Requirements

- PHP >= 7.4  
- Laravel >= 8.x  
- Composer

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/rizkiramadhani-001/UMKMVerse/tree/backend/backend
    cd UMKMVerse/backend
    ```

2. Install dependencies:
    ```bash
    composer install
    ```

3. Copy the `.env.example` to `.env` and configure your environment variables (database, mail, etc.):
    ```bash
    cp .env.example .env
    ```

4. Generate the application key:
    ```bash
    php artisan key:generate
    ```

5. Run migrations:
    ```bash
    php artisan migrate
    ```

## API Endpoints

### Register User

- **URL**: `/api/register`  
- **Method**: `POST`  
- **Request Body**:
    ```json
    {
      "name": "John Doe",
      "email": "johndoe@example.com",
      "password": "password123",
      "password_confirmation": "password123",
      "role": "user"
    }
    ```
- **Response**:
    ```json
    {
      "message": "User registered successfully!",
      "data": {
        "id": 1,
        "name": "John Doe",
        "email": "johndoe@example.com",
        "role": "user"
      },
      "token": "your-api-token"
    }
    ```

### Login User

- **URL**: `/api/login`  
- **Method**: `POST`  
- **Request Body**:
    ```json
    {
      "email": "johndoe@example.com",
      "password": "password123"
    }
    ```
- **Response**:
    ```json
    {
      "message": "Login successful",
      "token": "your-api-token"
    }
    ```

- **Authorization Header Example**:  
    Once you receive your token, include it in the header for authenticated requests:
    ```
    Authorization: Bearer your-api-token
    ```

### Protected Route Example

- **URL**: `/api/user`  
- **Method**: `GET`  
- **Headers**:  
    ```
    Authorization: Bearer your-api-token
    ```
- **Response**:
    ```json
    {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@example.com",
      "role": "user"
    }
    ```

## Conclusion

This API allows you to register and authenticate users with role-based access control.  
After logging in, use the **Bearer token** in the `Authorization` header to access protected routes according to the user's role.
