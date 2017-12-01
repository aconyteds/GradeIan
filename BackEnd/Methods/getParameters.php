<?php
  //function to retrieve properties expected by the caller
  //Accepts an array of strings which represent the values the function should look for
  function getParameters($params){
    //Check if there are any params, this is a dummy test
    if(count($params) > 0){
      //Create a response object
      $response= new stdClass();
      //See if the call is a get
      if($_GET[$params[0]]){
        //Iterate through the params
        foreach ($params as $value) {
          //Append to the response object as the property
          $response->$value = $_GET[$value];
        }
      }
      //Not a GET, see if it is a POST
      elseif ($_POST[$params[0]]) {
        //Same iteration, but with POST
        foreach ($params as $value) {
          $response->$value = $_POST[$value];
        }

      }
      //Now we want to handle payloads
      else{
        $request_body = file_get_contents('php://input');
        $data = json_decode($request_body);
        //Same iteration, but with the payload
        foreach($params as $value){
          $response->$value = $data->$value;
        }
      }
      //Return the class containing all the parameters and their respective values
      return $response;
    }
    return null;
  }
?>
