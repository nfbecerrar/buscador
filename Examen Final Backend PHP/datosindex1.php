<?php 
// ahora llamamos los mismos pero par alos tipos de casas
try
{
  $data = file_get_contents("data-1.json");
  $Selinmuebles = json_decode($data);
  $tipos = [];
  foreach ($Selinmuebles as $key => $json) {
    $tipos[] = $json->Tipo;
  }
  $tipos = array_unique($tipos);
  $tiposSel = "";
  foreach ($tipos as $tipo) {
    $tiposSel .= "<option value=\"$tipo\">$tipo</option>";
  }
  echo $tiposSel;
}
catch(Exception $exep)
{
  echo $exep->getMessage();
}



 ?>
