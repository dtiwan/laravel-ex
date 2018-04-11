<?php

namespace App\Http\Controllers\Auth;


use Illuminate\Notifications\Notifiable;
use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;

use Illuminate\Support\Str;
use App\Transformers\Json;
use Illuminate\Foundation\Auth\ResetsPasswords;
use Illuminate\Support\Facades\Password;

class ResetPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset requests
    | and uses a simple trait to include this behavior. You're free to
    | explore this trait and override any methods you wish to tweak.
    |
    */



    public function reset(Request $request)
    {

         $this->validate($request, [
            'token' => 'required', 
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Here we will attempt to reset the user's password. If it is successful we
        // will update the password on an actual user model and persist it to the
        // database. Otherwise we will parse the error and return the response.
        $response = $this->broker()->reset(
            $this->credentials($request), function ($user, $password) {
                $this->resetPassword($user, $password);
            }
        );


        if ($response == Password::PASSWORD_RESET) {
            return response()->json(array('message' => 'Password reset successfully'));
        } else {
            return response()->json(array('message' => 'Somthing happen wrong')); 
        }

        
        // If the password was successfully reset, we will redirect the user back to
        // the application's home authenticated view. If there is an error we can
        // // redirect them back to where they came from with their error message.
        // return $response == Password::PASSWORD_RESET
        // ? $this->sendResetResponse($response)
        // : $this->sendResetFailedResponse($request, $response);
    }


    protected function credentials(Request $request)
    {
        return $request->only(
             'email', 'password', 'password_confirmation', 'token'
        );
    }


    protected function resetPassword($user, $password)
    {
        $user->forceFill([
            'password' => bcrypt($password),
            'remember_token' => Str::random(60),
        ])->save();

       // $this->guard()->login($user);
    }

    public function broker()
    {
        return Password::broker();
    }

    /**
     * Get the guard to be used during password reset.
     *
     * @return \Illuminate\Contracts\Auth\StatefulGuard
     */
    protected function guard()
    {
        return Auth::guard();
    }
}
