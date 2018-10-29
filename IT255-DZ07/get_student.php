<?php
$type = $_GET['type'];
if ($type == "xml") {
    header("Content-type: text/xml");
    $test_array = array(
        'Marko' => 'name',
        'Stojanovic' => 'last_name',
        '1983' => 'index_no',
    );
    $xml = new SimpleXMLElement('<root/>');
    array_walk_recursive($test_array, array($xml, 'addChild'));
    print $xml->asXML();

} else {
    header("Content-type: application/json");
    $test_array = array(
        'name' => 'Marko',
        'last_name' => 'Stojanovic',
        'index_no' => '1983',
    );
    echo json_encode($test_array);
}
?>