<?php

namespace App\Http\Controllers\Auth;


use App\Http\Controllers\Controller; 
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWtTException;
use JWTAuth;

class LoginController extends Controller
{
    public function signin(Request $request) {

        $this->validate($request,[ 
          'email' => 'required|email',         
          'password' => 'required' 
        ]);

        $credentials = $request->only('email','password');

        try {
            if(!$token = JWTAuth::attempt($credentials)){
                return response()->json([
                    'error' => 'Invalid Credentials'
                ],401);
            }

        } catch (JWtTException $e) {
            return response()->json([
                'error' => 'Could not create token'
            ],500);
        }

        return response()->json([
            'token'=>$token
        ]);
   }
}
