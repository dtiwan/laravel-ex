<?php

namespace App\Http\Controllers\Auth;

use App\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
   public function signup(Request $request) {

        $this->validate($request,[ 
          'name' => 'required', 
          'email' => 'required|email|unique:users',         
          'password' => 'required' 
        ]);

        $user = new User([ 
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => bcrypt($request->input('password')) 
        ]); 
        $user->save(); 
        return response()->json([
            'message' => 'Successfully created user!'
        ], 201);
   }
}
