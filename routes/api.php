<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::get('home', function () {
//     $customer = App\Customers::find(1);
//     return response()->json($customer);	
// });

// Route::get('appealrecords', function () {			
//     $Appealrecords = App\Appealrecords::where('QuickRefID','M385521')->get(['AppealID','AppellantState']);
//     return response()->json($Appealrecords);	
// });

// Route::get('property', function () {		
//     $Appealrecords = App\Property::where('PropertyNumber','2-89-0000-5000-30-01')->get(['RecordType','QuickRefID']);
//     return response()->json($Appealrecords);	
// });

// Route::get('search', function () {		
// 	$tag = 'KENDALL';
//     $Appealrecords = App\Property::where('Situs', 'LIKE', '%'.$tag.'%'	)->orderBy('Situs')->get(['Situs','RecordType','QuickRefID']);	
//     return response()->json($Appealrecords);	
// });
			


Route::post('/user/signup', 'Auth\RegisterController@signup');

Route::post('/user/signin', 'Auth\LoginController@signin');

Route::post('/password/email', 'Auth\ForgotPasswordController@getResetToken');

Route::post('/password/reset', 'Auth\ResetPasswordController@reset');

Route::get('search/{search}', 'PropertyController@search');

Route::get('detail/{id}', 'PropertyController@detail');

Route::post('/contactus', 'PropertyController@contactus');



Route::group(['middleware' => ['jwt.auth']], function () {
	
    Route::get('validateToken', 'validateToken@checkToken');	

    Route::get('report/{id}', 'PropertyController@report');
});



