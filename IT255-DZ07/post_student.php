<?php
$name = $_POST['name'];
$lastname = $_POST['last_name'];
$indexno = $_POST['index_no'];
$type = $_POST['type'];

if($type == "json"){
    header("Content-type: application/json");
    $json_array = array (
        'name' => $name,
        'last_name' => $lastname,
        'index_number' => $indexno,

    );
    echo json_encode($json_array);
}else {
    header("Content-type: text/xml");
    $xml_array = array (
        $name => 'name',
        $lastname => 'last_name',
        $indexno => 'index_no',

    );
    $xml = new SimpleXMLElement('<root/>');
    array_walk_recursive($xml_array, array ($xml, 'addChild'));
    print $xml->asXML();
}
?>