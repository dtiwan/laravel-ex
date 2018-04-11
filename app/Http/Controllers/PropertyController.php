<?php

namespace App\Http\Controllers;

use App\Property;
use App\Appealrecords;
use JWTAuth;
use Illuminate\Http\Request;
use DB;
use Mail;

class PropertyController extends Controller
{

	public function search($search){
    	$searchResult = Property::where('Situs', 'LIKE', $search.'%'	)->orderBy('Situs')->get(['Situs','QuickRefID']);	
    	return response()->json($searchResult);
    }


    public function report($id){
        $similarProperty = DB::select("SELECT 
            p.* ,CASE WHEN p.garage_area/searched.garage_area > 1.15 then 1 else 0 end as big_garage
            FROM property_aggregated p
            INNER JOIN (SELECT nbhdcode, SquareFootage, years_old, numfloors, price_persqft, garage_area FROM property_aggregated WHERE quickrefid = '".$id."') searched
            on searched.nbhdcode = p.nbhdcode
            where abs(searched.SquareFootage-p.SquareFootage) <= 150
            and abs(searched.years_old - p.years_old) <= 4
            and searched.numfloors = p.numfloors
            and searched.price_persqft > p.price_persqft
            order by p.price_persqft");

        $selectedProperty = DB::select("SELECT * FROM property_aggregated WHERE quickrefid = '".$id."'");

        $row = count($similarProperty);
       

        if($row > 0){
            //$numbers = min(array_column($similarProperty, 'price_persqft'));
            $numbers = min(array_column(json_decode(json_encode($similarProperty), true), 'price_persqft'));
            $appraisedValue = $selectedProperty[0]->{'SquareFootage'}*$numbers;
            $curAssessedValue = $selectedProperty[0]->{'currAssessedValue'};
            $savingValue =$curAssessedValue - $appraisedValue;
            $saving = ($selectedProperty[0]->{'TotalTaxRate'}*0.01*($selectedProperty[0]->{'currAssessedValue'} - $appraisedValue));


            return response()->json(array(
                'similarPropertyFound'=> true,
                'row' => $row,
                'Taxrate' => $selectedProperty[0]->{'TotalTaxRate'},
                'appraisedValue'=> $appraisedValue,
                'curAssessedValue'=> $curAssessedValue,
                'price_persqft' =>$numbers,
                'saving' => $saving,
                'savingValue' => $savingValue,
                'HomeStead_Alert' => $selectedProperty[0]->{'HomeStead_Alert'},
                'NbhdDesc_drvd' => $selectedProperty[0]->{'NbhdDesc_drvd'}, 
                'selectedProperty' => $selectedProperty,
                'similarProperty'=> $similarProperty,
            )); 
        }else{
            return response()->json(array(
                'similarPropertyFound'=> false,
            )); 
        }
        
    }




    public function detail($id)
    {
    	$PropertyDetail = Property::where('QuickRefID',$id)->select('Situs','QuickRefID','NbhdCode')->get();

    	$PropertyNHCount = Property::where('NbhdCode',$PropertyDetail[0]['NbhdCode'])->count();

    	$AppealNHCount = Appealrecords::where('NeighborhoodCode',$PropertyDetail[0]['NbhdCode'])->count();

    	$AppealRecords = Appealrecords::where('NeighborhoodCode',$PropertyDetail[0]['NbhdCode'])->select('QuickRefID','AppealActionCode','TaxYear','NeighborhoodCode')->get();

    	for($i=0;$i<$AppealRecords->count();$i++){
    		for($j=$i+1;$j<$AppealRecords->count();$j++){
    			if($AppealRecords[$i]['QuickRefID'] == $AppealRecords[$j]['QuickRefID']){
    				// echo $i.' '.$AppealRecords[$i]['AppealActionCode'].' '.$AppealRecords[$i]['TaxYear'].'<br>'.$j.' '.$AppealRecords[$j]['AppealActionCode'].' '.$AppealRecords[$j]['TaxYear'].'<br><br>';

    				if($AppealRecords[$i]['AppealActionCode'] == 'PF'){
    					unset($AppealRecords[$j]['QuickRefID']);
    					unset($AppealRecords[$j]['AppealActionCode']);
    					unset($AppealRecords[$j]['TaxYear']);
    					unset($AppealRecords[$j]['NeighborhoodCode']);
    				}
    				else if($AppealRecords[$j]['AppealActionCode'] == 'PF'){
    					unset($AppealRecords[$i]['QuickRefID']);
    					unset($AppealRecords[$i]['AppealActionCode']);
    					unset($AppealRecords[$i]['TaxYear']);
    					unset($AppealRecords[$i]['NeighborhoodCode']);
    					break;
    				}else{
    					unset($AppealRecords[$j]['QuickRefID']);
    					unset($AppealRecords[$j]['AppealActionCode']);
    					unset($AppealRecords[$j]['TaxYear']);  
    					unset($AppealRecords[$j]['NeighborhoodCode']);
    				}
    			}
    		}
    	}

    	foreach($AppealRecords as $AppealRecord => $value) {
    		if(!isset($value->QuickRefID)){
    			unset($AppealRecords[$AppealRecord]);
    		}
		}

		$count = 0;
		foreach($AppealRecords as $AppealRecord => $value) {
    		if($value->AppealActionCode == 'PF'){
    			$count++;
    		}
		}

        $similarProperty = DB::select("SELECT 
            p.* ,CASE WHEN p.garage_area/searched.garage_area > 1.15 then 1 else 0 end as big_garage
            FROM property_aggregated p
            INNER JOIN (SELECT nbhdcode, SquareFootage, years_old, numfloors, price_persqft, garage_area FROM property_aggregated WHERE quickrefid = '".$id."') searched
            on searched.nbhdcode = p.nbhdcode
            where abs(searched.SquareFootage-p.SquareFootage) <= 150
            and abs(searched.years_old - p.years_old) <= 4
            and searched.numfloors = p.numfloors
            and searched.price_persqft > p.price_persqft
            order by p.price_persqft");

        $selectedProperty = DB::select("SELECT * FROM property_aggregated WHERE quickrefid = '".$id."'");

        $row = count($similarProperty);

        if($row > 0){
            $similarPropertyFound = true;
            $numbers = min(array_column(json_decode(json_encode($similarProperty), true), 'price_persqft'));
            $appraisedValue =$selectedProperty[0]->{'currAssessedValue'} - $selectedProperty[0]->{'SquareFootage'}*$numbers;
        }else{
            $similarPropertyFound = false;
            $numbers = null;
            $appraisedValue = null;
        }

        // third graph
        $Neighborhood = DB::select("SELECT
             SUM(appealed_2014)*100/COUNT(* ) as ngbrhd_2014,
             SUM(appealed_2015)*100/COUNT( *) as ngbrhd_2015,
             SUM(appealed_2016)*100/COUNT( *) as ngbrhd_2016
            FROM property_aggregated
            WHERE NbhdCode= '".$selectedProperty[0]->{'NbhdCode'}."'");

        $County  = DB::select("SELECT
             SUM(appealed_2014)*100/COUNT(* ) as county_2014,
             SUM(appealed_2015)*100/COUNT( *) as county_2015,
             SUM(appealed_2016)*100/COUNT( *) as county_2016
            FROM property_aggregated
            WHERE CountyCode= '".$selectedProperty[0]->{'CountyCode'}."'");

        
    	return response()->json(array(
                'NeighborhoodAppealsRate' => $Neighborhood,
                'CountyAppealsRate' => $County,
                'row' => $row,
                'appraisedValue'=> $appraisedValue,
                'price_persqft' =>$numbers,
                'selectedProperty' =>$selectedProperty,
                'similarPropertyFound' => $similarPropertyFound,
                'HomeStead_Alert' => $selectedProperty[0]->{'HomeStead_Alert'},
                'NbhdDesc_drvd' => $selectedProperty[0]->{'NbhdDesc_drvd'}, 
                'PropertyDetail'=>$PropertyDetail[0],
                'AppealsVolume' =>  array(
                    'Appeals'=> $AppealRecords->count(),
                    'NoAppeals'=> $AppealNHCount - $AppealRecords->count()
                ),
                'AppealsSuccessRate' =>  array(
                    'Successful'=> $count,
                    'Unsuccessful'=> $AppealRecords->count() - $count
                )
            ));	
        }



        public function contactus(Request $request){
            $this->validate($request,[ 
              'name' => 'required', 
              'email' => 'required|email',         
              'message' => 'required' 
            ]);

           

            $name = $request->{'name'};
            $email = $request->{'email'};
            $messagedata = $request->{'message'};
            $phone = $request->{'phone'};

             $data = array(
                'name'=>$name, 
                'email'=>$email, 
                'messagedata'=>$messagedata,
                'phone'=>$phone,
            );


            Mail::send('emails.contactus', $data , function ($message) use ($data)
            {
                $message->from('info.appraisalguru@gmail.com', 'Contact Us From');

                $message->subject('Contact Us');

                $message->to(env('MAIL_FROM_ADDRESS', 'info.appraisalguru@gmail.com'));

            });     

            return response()->json(array('message' => 'Message Successfully sent'));
        }
    
}
