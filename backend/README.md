# Laravel API for Login and Registration with Role-Based Authentication

This is a simple Laravel API for user registration and login functionality, with support for role-based access control.

## Requirements

- PHP >= 7.4
- Laravel >= 8.x
- Composer

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/laravel-api-role-auth.git
    cd laravel-api-role-auth
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

### Admin-Only Route

- **URL**: `/api/admin`
- **Method**: `GET`
- **Headers**: `Authorization: Bearer <token>`
- **Response**:
    ```json
    {
      "message": "Admin area"
    }
    ```

## Conclusion

This API allows you to register and authenticate users with role-based access control. You can use the token provided upon login to access protected routes based on the user's role.
