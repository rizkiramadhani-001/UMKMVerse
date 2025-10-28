<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'nullable|string|max:50',
            'password' => ['required', Password::min(8)->mixedCase()->numbers()->symbols()],
            'role' => 'required|in:user,admin,umkm,investor,distributor', // Add role validation (user or admin)
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $request], 422);
        }

        // Create the user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role' => $request->role, // Store the role
        ]);

        // Use Auth::attempt() to log in the user immediately after registration
        $credentials = [
            'email' => $request->email,
            'password' => $request->password
        ];

        $redirect_url = '';
        if ($user->role === 'admin') { 
            $redirect_url = '/admin-dashboard';
        } elseif ($user->role === 'umkm') {
            $redirect_url = '/umkm-dashboard';
        } elseif ($user->role === 'investor') {
            $redirect_url = '/investor-dashboard';
        } elseif ($user->role === 'supplier') {
            $redirect_url = '/supplier-dashboard';
        } elseif ($user->role === 'distributor') {
            $redirect_url = '/distributor-dashboard';
        } else {
            $redirect_url = '/user-dashboard';
        }
        // Attempt to log the user in
        if (Auth::attempt($credentials)) {
            // If login is successful, generate the token
            $user = Auth::user();
            $token = $user->createToken('API Token')->plainTextToken;

            // Return only the token in the response
            return response()->json([
                'message' => 'User registered and logged in successfully!',
                'redirect_url'=> $redirect_url,
                'token' => $token, // No user data in response
            ], 201);
        } else {
            return response()->json(['error' => 'Unable to authenticate user after registration.'], 500);
        }
    }

    public function login(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        // Check user credentials
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Generate token
        $token = $user->createToken('API Token')->plainTextToken;


        if ($user->role === 'admin') {
            $redirect_url = '/admin-dashboard';
        } elseif ($user->role === 'umkm') {
            $redirect_url = '/umkm-dashboard';
        } elseif ($user->role === 'investor') {
            $redirect_url = '/investor-dashboard';
        } elseif ($user->role === 'supplier') {
            $redirect_url = '/supplier-dashboard';
        } elseif ($user->role === 'distributor') {
            $redirect_url = '/distributor-dashboard';
        } else {
            $redirect_url = '/user-dashboard';
        }
        return response()->json([
            'message' => 'Login successful',
            'redirect_url'=> $redirect_url,
            'token' => $token, // Only returning token
        ]);
    }
}
