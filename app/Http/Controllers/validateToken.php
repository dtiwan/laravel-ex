<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;

class validateToken extends Controller
{

	public function checkToken(){
        return response()->json(array(
            'succeed'=> 'authentication successful'
        )); 
    }
    
}
