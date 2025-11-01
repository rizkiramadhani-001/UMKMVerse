# UMKM Platform - Setup Guide

Complete guide for setting up the UMKM Platform with React frontend and Laravel backend with Reverb for real-time features.

---

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Backend Setup (Laravel + Reverb)](#backend-setup-laravel--reverb)
- [Frontend Setup (React)](#frontend-setup-react)
- [Running the Application](#running-the-application)
- [Environment Configuration](#environment-configuration)
- [Troubleshooting](#troubleshooting)

---

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **PHP** >= 8.1
- **Composer** >= 2.0
- **Node.js** >= 18.0
- **npm** or **yarn**
- **MySQL** >= 8.0 or **PostgreSQL** >= 13
- **Git**

---

## 📁 Project Structure

```
project-root/              # React App (Frontend)
├── src/
│   ├── components/
│   ├── pages/
│   ├── config/
│   └── ...
├── public/
├── backend/              # Laravel API (Inside React project)
│   ├── app/
│   ├── config/
│   ├── database/
│   ├── routes/
│   ├── .env
│   └── ...
├── package.json
├── vite.config.js
├── .env
└── ...
```

---

## 🚀 Backend Setup (Laravel + Reverb)

### Step 1: Clone the Repository

```bash
git clone <your-repository-url>
cd project-root
cd backend
```

### Step 2: Install PHP Dependencies

```bash
composer install
```

### Step 3: Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` file with your configuration:

```env
APP_NAME="UMKM Platform"
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database Configuration
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=umkm_platform
DB_USERNAME=root
DB_PASSWORD=your_password

# Sanctum Configuration
SANCTUM_STATEFUL_DOMAINS=localhost:5173,127.0.0.1:5173

# Broadcasting Configuration
BROADCAST_DRIVER=reverb

# Reverb Configuration
REVERB_APP_ID=your_app_id
REVERB_APP_KEY=your_app_key
REVERB_APP_SECRET=your_app_secret
REVERB_HOST=localhost
REVERB_PORT=8080
REVERB_SCHEME=http

# CORS Configuration
VITE_REVERB_APP_KEY="${REVERB_APP_KEY}"
VITE_REVERB_HOST="${REVERB_HOST}"
VITE_REVERB_PORT="${REVERB_PORT}"
VITE_REVERB_SCHEME="${REVERB_SCHEME}"
```

### Step 4: Generate Application Key

```bash
php artisan key:generate
```

### Step 5: Create Database

Create a new MySQL database:

```bash
mysql -u root -p
```

```sql
CREATE DATABASE umkm_platform;
EXIT;
```

### Step 6: Run Migrations

```bash
php artisan migrate
```

### Step 7: Seed Database (Optional)

```bash
php artisan db:seed
```

### Step 8: Install Laravel Reverb

```bash
php artisan install:broadcasting
```

This command will:
- Install required packages
- Publish broadcasting configuration
- Set up Reverb server

### Step 9: Create Storage Link

```bash
php artisan storage:link
```

### Step 10: Start Laravel Development Server

Open a terminal and run:

```bash
php artisan serve
```

The API will be available at `http://localhost:8000`

### Step 11: Start Reverb Server

Open a **new terminal** and run:

```bash
php artisan reverb:start
```

The Reverb WebSocket server will start at `ws://localhost:8080`

You should see output like:

```
INFO  Reverb server started.

  Local: http://127.0.0.1:8080
```

### Step 12: Start Queue Worker (Optional, for background jobs)

Open **another terminal** and run:

```bash
php artisan queue:work
```

---

## ⚛️ Frontend Setup (React)

### Step 1: Navigate to Project Root Directory

```bash
cd ..  # Go back to project root (if you're in backend folder)
# You should now be in the React project root where package.json is located
```

### Step 2: Install Node Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

### Step 3: Environment Configuration

Create `.env` file in the **project root directory** (same level as package.json):

```bash
touch .env
```

Edit `.env` file:

```env
# API Configuration
VITE_API_URL=http://localhost:8000/api

# Reverb WebSocket Configuration
VITE_REVERB_APP_KEY=your_app_key
VITE_REVERB_HOST=localhost
VITE_REVERB_PORT=8080
VITE_REVERB_SCHEME=http
```

**Important**: Make sure `VITE_REVERB_APP_KEY` matches the `REVERB_APP_KEY` from your Laravel `.env` file.

### Step 4: Install Axios (if not already installed)

```bash
npm install axios
```

### Step 5: Install Laravel Echo and Pusher (for Reverb client)

```bash
npm install laravel-echo pusher-js
```

### Step 6: Start React Development Server

```bash
npm run dev
```

The React app will be available at `http://localhost:5173`

---

## 🏃 Running the Application

You need to run **3 separate terminal windows**:

### Terminal 1: Laravel Server

```bash
# From project root
cd backend
php artisan serve
```

### Terminal 2: Reverb WebSocket Server

```bash
# From project root
cd backend
php artisan reverb:start
```

### Terminal 3: React Development Server

```bash
# From project root (where package.json is)
npm run dev
```

### Optional Terminal 4: Queue Worker

```bash
# From project root
cd backend
php artisan queue:work
```

---

## 🔐 Testing the Setup

### 1. Test Backend API

Open your browser or use curl:

```bash
curl http://localhost:8000/api
```

### 2. Test Frontend

Open your browser:

```
http://localhost:5173
```

### 3. Test Reverb Connection

Check the browser console for WebSocket connection messages when you load the React app.

---

## ⚙️ Environment Configuration

### Laravel `.env` (Backend)

```env
APP_NAME="UMKM Platform"
APP_ENV=local
APP_KEY=base64:...
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=umkm_platform
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=reverb
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database
SESSION_DRIVER=database

SANCTUM_STATEFUL_DOMAINS=localhost:5173,127.0.0.1:5173

REVERB_APP_ID=123456
REVERB_APP_KEY=your_app_key_here
REVERB_APP_SECRET=your_app_secret_here
REVERB_HOST=localhost
REVERB_PORT=8080
REVERB_SCHEME=http

VITE_REVERB_APP_KEY="${REVERB_APP_KEY}"
VITE_REVERB_HOST="${REVERB_HOST}"
VITE_REVERB_PORT="${REVERB_PORT}"
VITE_REVERB_SCHEME="${REVERB_SCHEME}"
```

### React `.env` (Frontend)

```env
VITE_API_URL=http://localhost:8000/api
VITE_REVERB_APP_KEY=your_app_key_here
VITE_REVERB_HOST=localhost
VITE_REVERB_PORT=8080
VITE_REVERB_SCHEME=http
```

**Note**: The React `.env` file should be in the **project root** directory (same level as `package.json`), while the Laravel `.env` file is inside the `backend/` folder.

---

## 🔧 Laravel Echo Setup (Frontend)

Create `src/config/echo.js`:

```javascript
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'reverb',
  key: import.meta.env.VITE_REVERB_APP_KEY,
  wsHost: import.meta.env.VITE_REVERB_HOST,
  wsPort: import.meta.env.VITE_REVERB_PORT,
  wssPort: import.meta.env.VITE_REVERB_PORT,
  forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
  enabledTransports: ['ws', 'wss'],
  authEndpoint: `${import.meta.env.VITE_API_URL}/broadcasting/auth`,
  auth: {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      Accept: 'application/json',
    },
  },
});

export default echo;
```

---

## 📡 Using Real-time Features

### Backend: Broadcasting Events

```php
use App\Events\MessageSent;

// Broadcast an event
broadcast(new MessageSent($message));
```

### Frontend: Listening to Events

```javascript
import echo from './config/echo';

// Listen to a channel
echo.channel('messages')
  .listen('MessageSent', (e) => {
    console.log('New message:', e.message);
  });

// Private channel (requires authentication)
echo.private(`chat.${chatId}`)
  .listen('MessageSent', (e) => {
    console.log('New message:', e.message);
  });
```

---

## 🐛 Troubleshooting

### Issue: Database Connection Error

**Solution**: Check your database credentials in `.env` and ensure MySQL/PostgreSQL is running:

```bash
mysql.server start  # macOS
sudo service mysql start  # Linux
```

### Issue: Reverb Connection Failed

**Solution**: 
1. Ensure Reverb server is running: `php artisan reverb:start`
2. Check that `REVERB_APP_KEY` matches in both Laravel and React `.env` files
3. Verify port 8080 is not being used by another application

### Issue: CORS Errors

**Solution**: Add your frontend URL to `config/cors.php`:

```php
'allowed_origins' => [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
],
```

### Issue: 401 Unauthorized on API Calls

**Solution**: 
1. Ensure you're sending the Bearer token in axios headers
2. Check token is stored correctly: `localStorage.getItem('token')`
3. Verify Sanctum is configured correctly

### Issue: WebSocket Connection Refused

**Solution**:
1. Check Reverb is running: `php artisan reverb:start`
2. Verify firewall isn't blocking port 8080
3. Check `.env` values match between Laravel and React

### Issue: npm/yarn Install Fails

**Solution**:
```bash
# Clear cache
npm cache clean --force
# or
yarn cache clean

# Delete node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

---

## 📝 Useful Commands

### Laravel Commands

```bash
# Clear all caches
php artisan optimize:clear

# Run migrations
php artisan migrate

# Rollback migrations
php artisan migrate:rollback

# Create new migration
php artisan make:migration create_table_name

# Create new model
php artisan make:model ModelName -m

# Create new controller
php artisan make:controller ControllerName

# Create new event
php artisan make:event EventName

# List all routes
php artisan route:list

# Tinker (Laravel REPL)
php artisan tinker
```

### React Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 🚀 Production Deployment

### Backend (Laravel)

1. Set `APP_ENV=production` and `APP_DEBUG=false` in `.env`
2. Run `composer install --optimize-autoloader --no-dev`
3. Run `php artisan config:cache`
4. Run `php artisan route:cache`
5. Run `php artisan view:cache`
6. Set up proper SSL certificates for HTTPS
7. Configure Reverb for production (use WSS instead of WS)

### Frontend (React)

1. Run `npm run build`
2. Deploy the `dist` folder to your web server
3. Configure your web server (Nginx/Apache) to serve the built files
4. Update `.env` with production API URLs

---

## 📚 Additional Resources

- [Laravel Documentation](https://laravel.com/docs)
- [Laravel Reverb Documentation](https://laravel.com/docs/reverb)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [Axios Documentation](https://axios-http.com)
- [Laravel Echo Documentation](https://laravel.com/docs/broadcasting#client-side-installation)

---

## 📄 License

This project is licensed under the MIT License.

---

## 👥 Support

For issues and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Happy Coding! 🎉**
