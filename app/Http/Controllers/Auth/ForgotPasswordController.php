<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Foundation\Auth\SendsPasswordResetEmails;
use Illuminate\Http\Request;
use Illuminate\Notifications\Messages\MailMessage;
use Mail;

class ForgotPasswordController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Password Reset Controller
    |--------------------------------------------------------------------------
    |
    | This controller is responsible for handling password reset emails and
    | includes a trait which assists in sending these notifications from
    | your application to your users. Feel free to explore this trait.
    |
    */

    use SendsPasswordResetEmails;

    public function getResetToken(Request $request)
    {

        $this->validate($request,[ 
          'email' => 'required|email'
        ]);

        $user = User::where('email', $request->input('email'))->first();
        if (!$user) {
            return response()->json(array('error' => 'email address not found'), 404);
        }
        $token = $this->broker()->createToken($user);

        $email = $request->{'email'};

        $link = url('/').'/#!/resetpassword/'.$email.'/'.$token;    

        Mail::send('emails.password_request_content', ['link' => $link] , function ($message) use ($email)
        {

            $message->from('info.appraisalguru@gmail.com', 'AppraisalGuru');

            $message->subject('Forgot Password');

            $message->to($email);

        });     

        return response()->json(array('message' => 'password reset mail send'));
    }

    
}
