<?php
// Logic ngirim pesan whatsapp 4pesan per menit, untuk mencegah overlooping dan whatsapp banned;

require "Emoji.php";    
$con = mysqli_connect("localhost","dbuser","dbpass","dbname");      
$data_link_wabot = mysqli_fetch_assoc(mysqli_query($con, "SELECT * FROM tbl_link_wabot WHERE id_link = '1' LIMIT 1"));   
$link_wabot = $data_link_wabot["link"];
$query =  "SELECT * FROM tbl_data_sendwhatsapp WHERE Pesan !='' AND STATUS = 'waiting' AND `Number` != '' ORDER BY ID ASC LIMIT 3";       
$fetchdata = mysqli_query($con, $query);    
$cekfetchdata = mysqli_num_rows(mysqli_query($con, $query));

if($cekfetchdata>0) {
  foreach($fetchdata as $data) {  
    $ID1 = $data['ID'];
    $pesanawal1 = $data['Pesan'];
    $pesan01 = ucfirst(trim(str_replace('&', 'dan', $data['Pesan'])));
    $pesan1 = Emoji::Decode($pesan01);  
    $nomor1 = $data["Number"];

    // Send Message
    $curl1 = curl_init(); 
    curl_setopt_array($curl1, array(    
      CURLOPT_URL => $link_wabot.'/send-message',
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => array('number'=>$nomor1,'message'=>$pesan1),
    ));
    $result1 = curl_exec($curl1);
    curl_close($curl1);
    $res1 = json_decode($result1, TRUE);
    // echo $result1;
    if($res1['status'] == 'sent'){
      // echo "terkirim";
      mysqli_query($con, "DELETE FROM tbl_data_sendwhatsapp WHERE ID = '$ID1'");
    }
    else {
      // echo "pending";
      mysqli_query($con, "UPDATE tbl_data_sendwhatsapp SET STATUS = 'pending' WHERE ID = '$ID1'");    
      mysqli_query($con, "UPDATE tbl_switch_wabot SET status_wabot = '0'");     
    }   
    mysqli_query($con, "DELETE FROM tbl_data_sendwhatsapp WHERE Pesan = '$pesanawal1'");

    sleep(10);
  }
  // End Send Message
} // end cekfetchdata
else {}
mysqli_close($con);
?>