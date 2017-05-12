<?php

$HOST = "localhost";
$USER = "root";
$PASS = "root";
$DB="communitywall";
$TABLE="documents";

$con=mysqli_connect($HOST,$USER,$PASS,$DB);
// Check connection
if (mysqli_connect_errno()){
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

if($_POST['method']=='dbtolocal'){
	
	$sql="SELECT * FROM ".$TABLE."  ";
	$result=mysqli_query($con,$sql);
	while($row=mysqli_fetch_assoc($result)){
	   $data[] = $row; 
	}
	echo(json_encode($data));
}else{
	//method == localtodb
	//echo($_POST['data']);
	$data = json_decode($_POST['data']);

	


	//echo($result);
	/* step : 2 
	loop through  the array
	with each:: check if a record with same id already exists:
	if yes:: UPDATE
	if no:: INSERT

	*/
	$ct = count($data);
	//echo($ct);
	for($i=0;$i<$ct;$i++){

		//echo($data[$i]->name);
		$sql_id = "SELECT * FROM ".$DB.".".$TABLE." WHERE id =".$data[$i]->id."";
		//echo($sql_id);
		$res_id = mysqli_query($con,$sql_id);
		while($row=mysqli_fetch_assoc($res_id)){
	   		$dataX[] = $row; 
		}
		echo(json_encode($dataX));
		if(count($dataX) >0){
			echo('xUPDATE');
			$sql_UP = "UPDATE ".$DB.".".$TABLE." set parent_id = '".$data[$i]->parent_id."' , name = '".$data[$i]->name."' , type = '".$data[$i]->type."' , url = '".$data[$i]->url."'   WHERE id = ".$data[$i]->id."";
			$resultQ=mysqli_query($con,$sql_UP);

		}else{
			echo('xINSERT');
			$sql_IN = "INSERT INTO ".$DB.".".$TABLE." (id, parent_id, name, type, url, date_created) VALUES ('".$data[$i]->id."', '0', '".$data[$i]->name."', 'xy', 'xy', 'yy');";
	
			$resultZ=mysqli_query($con,$sql_IN);
		}
		//unset($dataX);
	}
	 
}


// Free result set
mysqli_free_result($result);
mysqli_close($con);

?>