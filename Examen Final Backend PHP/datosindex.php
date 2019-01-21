<?php
try {
  //aqui llamamos la base json
  $data = file_get_contents("data-1.json");
  //creamos una variable para usar con los selects
  $selinmueble = json_decode($data);
  //creamos una variable para ese select
  $ciudades =[];
  //ahora un un ciclo creamos un array
  foreach ($selinmueble as $key => $json){
      $ciudades[] = $json->Ciudad;
  }
    $ciudades = array_unique($ciudades);
    $ciudadSel = "";
    foreach ($ciudades as $ciudad){
      $ciudadSel .="<option value=\"$ciudad\">$ciudad</option>";
    }
    echo $ciudadSel;
  }
  catch(Exception $exep){
    echo $exep->getMessage();
  }
