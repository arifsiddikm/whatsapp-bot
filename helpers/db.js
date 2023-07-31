const { resolveTxt } = require('dns');
const mysql = require('mysql2/promise');
const replace = require("replace");
 
const createConnection = async () => {
    return await mysql.createConnection({
        host: 'localhost',
        user: '',
        password: '',
        database: '', 
    });
}
const createConnectionAccess = async () => {
    return await mysql.createConnection({
        host: 'localhost',
        user: '',
        password: '',
        database: '',
    }) 
} 
const getReply = async (keyword2) => {    
    const connection = await createConnection();        
    const connectionaccess = await createConnectionAccess();
    
    var pecahkeyword2 = keyword2.split("|pisah|");
    var pushname = pecahkeyword2[0];
    var keyword = pecahkeyword2[1].trim();       
    var phonenumber = pecahkeyword2[2];   
    // var phonenumber = "08xxxxx"; 
    
    function rupiah(angka) {
        var bilangan = angka;
        var	number_string = bilangan.toString(),
            sisa 	= number_string.length % 3,
            rupiah 	= number_string.substr(0, sisa),
            ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
        if (ribuan) { 
            separator = sisa ? '.' : '';
            rupiah += separator + ribuan.join('.');
        } 
        return rupiah;
    }
    function ucwords (str) {
        return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
            return $1.toUpperCase();
        });
    } 
    function strtolower (str) {
        return (str+'').toLowerCase();
    } 
    function ucfirst (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const d = new Date(); 
    let hh = d.getHours();      
    let mm = d.getMinutes();  
    let ss = d.getSeconds(); 
    let session = "AM";   
    if(hh == 0){hh = 12;} 
    if(hh > 12){hh = hh - 12;session = "PM";}
    hh = (hh < 10) ? "0" + hh : hh;     
    mm = (mm < 10) ? "0" + mm : mm;   
    ss = (ss < 10) ? "0" + ss : ss; 
    // let yearnow = d.getFullYear();    
    // var monthnow = String(d.getMonth() + 1).padStart(2, '0'); //January is 0!
    const lastyear = d.getFullYear() - 1; 
    const yearnow = d.getFullYear();          
    var lastmonth0 = d.getMonth(); // 👈️ months are 0-based
    var last2month0 = d.getMonth() - 1; // 👈️ months are 0-based
    var last3month0 = d.getMonth() - 3; // 👈️ months are 0-based
    const monthnow = d.getMonth() + 1; // 👈️ months are 0-based
    const daysInCurrentMonth = getDaysInMonth(yearnow, monthnow); 
    if(monthnow < 10) { var monthnow2 = "0"+monthnow;}          
    else {var monthnow2 = monthnow;}
    // console.log(daysInCurrentMonth);  
    var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    var dayname = days[new Date().getDay()];
    var datenow = String(d.getDate()).padStart(2, '0'); 
    var todaydate = yearnow + '-' + monthnow2 + '-' + datenow;   
    var dateinserted = yearnow + '-' + monthnow2 + '-' + datenow;    
    var dateinserted2 = yearnow + '-' + monthnow2 + '-' + datenow + ' ' + hh + ':' + mm + ':' + ss;
    var todaydate2 = yearnow + '-' + monthnow2 + '-';    
    var todaydate2forabsen1 = yearnow + '' + monthnow2 + '' + datenow;    
    var todaydate2forabsen2 = monthnow2 + '/' + yearnow;    
    if(lastmonth0 < 10) { var lastmonth = "0"+lastmonth0;}  
    else {var lastmonth = lastmonth0;}    
    if(last2month0 < 10) { var last2month = "0"+last2month0;} 
    else {var last2month = last2month0;}    
    if(last3month < 10) { var last3month = "0"+last3month0;}  
    else {var last3month = last3month0;}   
    var todaydate3 = lastmonth + '' + yearnow;    
    var todaydate3_2 = last2month + '' + yearnow;    
    var todaydate3_3 = last3month + '' + yearnow;    
    var todaydate3_4 = last3month + '' + lastyear;    
    var todaydate4 = datenow + '.' + monthnow2; 
    var todaydate4_2 = datenow + '.' + monthnow2;  
    var todaydate5 = monthnow2 + '' + yearnow;   
    var todaydate5_2 = lastmonth + '' + yearnow;    
    var todaydate5_3 = last2month + '' + yearnow;   
    var todaydate5_4 = last3month + '' + lastyear;   
    var todaydate6 = yearnow + '' + monthnow2;  
    var todaydate7 = yearnow + '0' + lastmonth;  
    var todaydate8 = yearnow + '0' + monthnow2;  
    function getDaysInMonth(year, month) {  
        return new Date(year, month, 0).getDate(); 
    } 
    function ConvertMonthText(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);
        return date.toLocaleString('en-US', {
          month: 'long',
        });
    }
    function getMonthNowText() {
        var monthnowtext = ConvertMonthText(monthnow2);
        if(monthnowtext=="January") {  return "Januari"; } 
        else if(monthnowtext=="February") {  return "Februari"; } 
        else if(monthnowtext=="March") {  return "Maret"; } 
        else if(monthnowtext=="Apr") {  return "April"; } 
        else if(monthnowtext=="April") {  return "April"; } 
        else if(monthnowtext=="May") {  return "Mei"; } 
        else if(monthnowtext=="June") {  return "Juni"; } 
        else if(monthnowtext=="July") {  return "Juli"; } 
        else if(monthnowtext=="August") {  return "Agustus"; } 
        else if(monthnowtext=="September") {  return "September"; } 
        else if(monthnowtext=="October") {  return "Oktober"; } 
        else if(monthnowtext=="November") {  return "November"; } 
        else if(monthnowtext=="December") {  return "Desember"; } 
        else {return "-"; }  
    }         
    function getLastMonthText() {
        var lastmonthtext = ConvertMonthText(lastmonth);
        if(lastmonthtext=="January") {  return "Januari"; } 
        else if(lastmonthtext=="February") {  return "Februari"; } 
        else if(lastmonthtext=="March") {  return "Maret"; } 
        else if(lastmonthtext=="Apr") {  return "April"; } 
        else if(lastmonthtext=="April") {  return "April"; } 
        else if(lastmonthtext=="May") {  return "Mei"; } 
        else if(lastmonthtext=="June") {  return "Juni"; } 
        else if(lastmonthtext=="July") {  return "Juli"; } 
        else if(lastmonthtext=="August") {  return "Agustus"; } 
        else if(lastmonthtext=="September") {  return "September"; } 
        else if(lastmonthtext=="October") {  return "Oktober"; } 
        else if(lastmonthtext=="November") {  return "November"; } 
        else if(lastmonthtext=="December") {  return "Desember"; } 
        else {return "-"; }  
    }
    function getLastMonthText2() {
        var lastmonthtext = ConvertMonthText(last2month);
        if(lastmonthtext=="January") {  return "Januari"; } 
        else if(lastmonthtext=="February") {  return "Februari"; } 
        else if(lastmonthtext=="March") {  return "Maret"; } 
        else if(lastmonthtext=="Apr") {  return "April"; } 
        else if(lastmonthtext=="April") {  return "April"; } 
        else if(lastmonthtext=="May") {  return "Mei"; } 
        else if(lastmonthtext=="June") {  return "Juni"; } 
        else if(lastmonthtext=="July") {  return "Juli"; } 
        else if(lastmonthtext=="August") {  return "Agustus"; } 
        else if(lastmonthtext=="September") {  return "September"; } 
        else if(lastmonthtext=="October") {  return "Oktober"; } 
        else if(lastmonthtext=="November") {  return "November"; } 
        else if(lastmonthtext=="December") {  return "Desember"; } 
        else {return "-"; }  
    }
    function getLastMonthText3() {
        var lastmonthtext = ConvertMonthText(last3month);
        if(lastmonthtext=="January") {  return "Januari"; } 
        else if(lastmonthtext=="February") {  return "Februari"; } 
        else if(lastmonthtext=="March") {  return "Maret"; } 
        else if(lastmonthtext=="Apr") {  return "April"; } 
        else if(lastmonthtext=="April") {  return "April"; } 
        else if(lastmonthtext=="May") {  return "Mei"; } 
        else if(lastmonthtext=="June") {  return "Juni"; } 
        else if(lastmonthtext=="July") {  return "Juli"; } 
        else if(lastmonthtext=="August") {  return "Agustus"; } 
        else if(lastmonthtext=="September") {  return "September"; } 
        else if(lastmonthtext=="October") {  return "Oktober"; } 
        else if(lastmonthtext=="November") {  return "November"; } 
        else if(lastmonthtext=="December") {  return "Desember"; } 
        else {return "-"; }  
    }
    function convert_month_eng_to_id1(str) {
        if(str=="Jan") {  return "Januari"; } 
        else if(str=="Feb") {  return "Februari"; } 
        else if(str=="Mar") {  return "Maret"; } 
        else if(str=="Apr") {  return "April"; } 
        else if(str=="May") {  return "Mei"; } 
        else if(str=="Jun") {  return "Juni"; } 
        else if(str=="Jul") {  return "Juli"; } 
        else if(str=="Aug") {  return "Agustus"; } 
        else if(str=="Sep") {  return "September"; } 
        else if(str=="Oct") {  return "Oktober"; } 
        else if(str=="Nov") {  return "November"; } 
        else if(str=="Dec") {  return "Desember"; } 
        else {return "-";}
    }
    function convert_month_eng_to_id2(str) {    
        if(str=="01") {  return "Januari"; }    
        else if(str=="1") {  return "Januari"; } 
        else if(str=="02") {  return "Februari"; } 
        else if(str=="2") {  return "Februari"; } 
        else if(str=="03") {  return "Maret"; } 
        else if(str=="3") {  return "Maret"; } 
        else if(str=="04") {  return "April"; } 
        else if(str=="4") {  return "April"; } 
        else if(str=="05") {  return "Mei"; } 
        else if(str=="5") {  return "Mei"; } 
        else if(str=="06") {  return "Juni"; } 
        else if(str=="6") {  return "Juni"; } 
        else if(str=="07") {  return "Juli"; } 
        else if(str=="7") {  return "Juli"; } 
        else if(str=="08") {  return "Agustus"; } 
        else if(str=="8") {  return "Agustus"; } 
        else if(str=="09") {  return "September"; } 
        else if(str=="9") {  return "September"; } 
        else if(str=="10") {  return "Oktober"; } 
        else if(str=="11") {  return "November"; } 
        else if(str=="12") {  return "Desember"; } 
        else {return "-";}
    }
    function convert_day_eng_to_id1(str) {
        if(str=="Sun") { return "Minggu"; } 
        else if(str=="Mon") { return "Senin"; } 
        else if(str=="Tue") { return "Selasa"; } 
        else if(str=="Wed") { return "Rabu"; } 
        else if(str=="Thu") { return "Kamis"; } 
        else if(str=="Fri") { return "Jum'at"; }  
        else if(str=="Sat") { return "Sabtu"; } 
        else {return "-";}  
    } 
    function convertGMTTimeFormat(str) {  
        var dateString01 = str.toString();      
        var dateString011 = dateString01.replace('00:00:00', '10:10:10');   
        var dateString = dateString011;  
        dateString = new Date(dateString).toUTCString();
        dateString = dateString.split(' ').slice(0, 4).join(' ');
        return dateString;  
    }
    function editdateinserted2(tanggal) {  
        if(tanggal!=="") {
            var pecah0 = tanggal.split(", "); 
            var pecah1 = pecah0[1].split(" ");
            var day = convert_day_eng_to_id1(pecah0[0]);
            var tgl = pecah1[0];
            var month = convert_month_eng_to_id1(pecah1[1]);
            var year = pecah1[2];
            var result = day+', '+tgl+' '+month+' '+year;
            return result;  
        }
        else {return "";}
    }
    function editdateinserted4(propstanggal) {
        var tanggal = propstanggal.substr(6,2);
        var bulan = propstanggal.substr(4,2);
        var tahun = propstanggal.substr(0,4);
        return tanggal+'-'+convert_month_eng_to_id2(bulan)+'-'+tahun;
    }
    function editdateinserted4_1(propstanggal) {
        var tanggal = propstanggal.substr(8,2);
        var bulan = propstanggal.substr(5,2);
        var tahun = propstanggal.substr(0,4);
        return tanggal+' '+convert_month_eng_to_id2(bulan)+' '+tahun;
    }
    function editdateinserted4_2(propstanggal) {
        var pecahprops = propstanggal.split(" ");
        var tanggal = pecahprops[0].substr(8,2);
        var bulan = pecahprops[0].substr(5,2);
        var tahun = pecahprops[0].substr(0,4);
        return tanggal+' '+convert_month_eng_to_id2(bulan)+' '+tahun;
    }
    function editdateinserted5(propstanggal) {
        var pecahprops = propstanggal.split(" ");
        var tanggal = pecahprops[0].substr(8,2);
        var bulan = pecahprops[0].substr(5,2);
        var tahun = pecahprops[0].substr(0,4);
        return tanggal+'-'+convert_month_eng_to_id2(bulan)+'-'+tahun + pecahprops[1];
    }
    function tanggalhariini() {
        return convert_day_eng_to_id1(dayname) +", " + editdateinserted4_1(todaydate);
    }

    const [hitdatakaryawan] = await connection.execute("SELECT DATA WHERE DATAKARYAWAN.NOTELP = '"+phonenumber+"' LIMIT 1"); 
    const [datakaryawan] = await connection.execute("SELECT DATA WHERE DATAKARYAWAN.NOTELP = '"+phonenumber+"' LIMIT 1");
    const [hitdatakaryawanjv] = await connection.execute("SELECT DATA WHERE DATAKARYAWAN.NOTELP = '"+phonenumber+"' LIMIT 1");
    const [datakaryawanjv] = await connection.execute("SELECT DATA WHERE DATAKARYAWAN.NOTELP = '"+phonenumber+"' LIMIT 1"); 
    if(hitdatakaryawan[0].JUMLAHKARYAWAN == "0") {
        if(hitdatakaryawanjv[0].JUMLAHKARYAWANJV == "0") {
            var cekjenisuser = "None";
            var persno = "";
            var persnomgr = "";
            var vendor = "";
            var persnm = "";
            var admin = "";
            var costctrno = "";
            var costctrnm = "";
        }
        else {
            var persno = datakaryawanjv[0].PERSNO;
            var persnomgr = datakaryawanjv[0].PERSNOMGR;
            var vendor = persno.substr(0,1);
            var persnm = datakaryawanjv[0].PERSNM;
            var costctrno = datakaryawanjv[0].PERSCOSTCTRNO;
            var costctrnm = datakaryawanjv[0].COSTCTRNM;
            var admin = datakaryawanjv[0].ADMIN;
            var cekjenisuser = "Eksternal"; 
        }  
    }
    else {
        var vendor = "";
        var persno = datakaryawan[0].PERSNO;
        var persnomgr = datakaryawan[0].PERSNOMGR;
        var persnm = datakaryawan[0].PERSNM;
        var costctrno = datakaryawan[0].PERSCOSTCTRNO;
        var costctrnm = datakaryawan[0].COSTCTRNM;
        var admin = datakaryawan[0].ADMIN;
        var cekjenisuser = "Internal";
    }
    
    var signature = "Website : https://domain.com/ \nInstagram : https://instagram.com/domain/\n\nJam kerja : Senin - Jumat : 08.00 - 16.30 WIB.\nUntuk keperluan/pertanyaan di luar jam kerja, Anda bisa mengirim email ke support@domain.com.";

    var messagehallo = "Hallo "+pushname+"👋🏻,"+signature;
    var khususadminjv = "";
    var menulainnya = "\n\nKetik *kurs* untuk Informasi Kurs Mata Uang terbaru.";

    if(cekjenisuser=="Internal") {
        const [ceklastperiode] = await connection.execute("");
        var paytype = ceklastperiode[0].PAYTYPE;
        if(paytype=="1") {var paytypename = "Regular";}
        var khusussdm = "";
        var messagelist = "Hallo "+pushname+"👋🏻,\nInformasi apa yang sedang Anda butuhkan?\n\n1️⃣ *?*.\n2️⃣ *Daftar XXX*.\n3️⃣ *Daftar XXX*.\n4️⃣ *Daftar XXX*.\n5️⃣ *Daftar XXX*.\n6️⃣ *Daftar XXX*.\n7️⃣ *Daftar XXX*.\n8️⃣ *Daftar XXX*.\n9️⃣ *Absensi XXX*.\n🔟 *Top Karyawan XXX*.\n1️⃣1️⃣ *SlipGaji Terakhir Anda*.\n1️⃣2️⃣ *XXX*.\n1️⃣3️⃣ *XXX*.\n1️⃣4️⃣ *Berita terbaru dari PipeFondation*.\n1️⃣5️⃣ *Berita terbaru dari Instagram Perusahaan*."+khusussdm+khususadminjv+menulainnya;
    }
    else if(cekjenisuser=="Eksternal") {
        var messagelist = "Hallo "+pushname+"👋🏻,\nInformasi apa yang sedang Anda butuhkan?\n\n1️⃣ *?*.\n2️⃣ *Daftar XXX*.\n3️⃣ *Daftar XXX*.\n4️⃣ *Daftar XXX*.\n5️⃣ *Daftar XXX*.\n6️⃣ *Daftar XXX*.\n7️⃣ *Daftar XXX*.\n8️⃣ *Daftar XXX*.\n9️⃣ *Absensi XXX*.\n🔟 *Top Karyawan XXX*.\n1️⃣1️⃣ *SlipGaji Terakhir Anda*.\n1️⃣2️⃣ *XXX*.\n1️⃣3️⃣ *XXX*.\n1️⃣4️⃣ *Berita terbaru dari PipeFondation*.\n1️⃣5️⃣ *Berita terbaru dari Instagram Perusahaan*."+khusussdm+khususadminjv+menulainnya;
    } 
    else {             
        var messagelist = "Hallo "+pushname+"👋🏻,\nInformasi apa yang sedang Anda butuhkan?\n\n1️⃣ *?*.";                              
    }
    
    // Insert into table log history chat 
    if(keyword.substr(0,7)=="insert:") {
        var pecahkeyword1 = keyword.split("insert:");
        var pecahkeyword2 = pecahkeyword1[1].split(",");
        var keywordnew = pecahkeyword2[0];
        var messagenew = pecahkeyword2[1];
        await connection.execute("INSERT INTO wa_reply VALUES (NULL,'"+keywordnew+"','"+messagenew+"')"); 
        connection.close(); 
    }

    if(keyword.substr(0,15)=="caridata:") {            
        var pecahkeyword1 = keyword.split("caridata:");  
        var message1 = "";
        const [datanya] = await connection.execute("SELECT DATA");            
        if(datanya.length > 0) {
            for (let i = 0; i < datanya.length; i++) {     
                var no1 = i+1;     
                message1 += no1+"Nama : "+datanya[i].nama;
                message1 += "\n";
            }
        }
        else {      
            message1 += "Data tidak ditemukan ^_^\n\n";  
        }   
        message1 += "";    
        message = message1.substr(0,message1.length-2);       
        connection.close();     
        return message;     
        return false; 
    }

    if(keyword=="outboxinfo") {  
        var message = "";         
        const [CekJumlahOutboxWaProcess] = await connection.execute("SELECT COUNT(StatusCode) AS JUMLAHNYA FROM `antrianpesan` WHERE antrianpesan.StatusCode = '-1'");       
        const [CekJumlahOutboxWaPending] = await connection.execute("SELECT COUNT(StatusCode) AS JUMLAHNYA FROM `antrianpesan` WHERE antrianpesan.StatusCode = '0'");         
        message += "*Antrian WhatsApp :* \n"+CekJumlahOutboxWaProcess[0].JUMLAHNYA+" diproses,\n"+CekJumlahOutboxWaPending[0].JUMLAHNYA+" pending\n\n*Antrian Email :* \n-\n-";   
        message += "\n\n";

        const [hitdataoutboxwa] = await connection.execute("SELECT COUNT(StatusCode) AS JUMLAHDATA FROM `antrianpesan`");       
        const [dataoutboxwa] = await connection.execute("SELECT * FROM `antrianpesan` LIMIT 20");
        
        if(hitdataoutboxwa[0].JUMLAHDATA != '0') { 
            var jumlahdataditampilkan1 = hitdataoutboxwa[0].JUMLAHDATA;
            message += "*Berikut "+jumlahdataditampilkan1+" data teratas dari Antrian WhatsApp;*\n\n";
            for (let i = 0; i < dataoutboxwa.length; i++) {   
                if(dataoutboxwa[i].StatusCode=="-1") {var emot1 = "🕑";}  
                else {var emot1 = "⚠️";}  
                var phonepenerima1 = dataoutboxwa[i].DestinationNumber;
                const [cekpenerima11] = await connection.execute("SELECT PERSNM, COUNT(PERSNO) AS JUMLAHDATA FROM DATAKARYAWAN WHERE NOTELP = '"+phonepenerima1+"' LIMIT 1");       
                const [cekpenerima12] = await connection.execute("SELECT PERSNM, COUNT(PERSNO) AS JUMLAHDATA FROM DATAKARYAWAN WHERE NOTELP = '"+phonepenerima1+"' LIMIT 1");       
                if(cekpenerima11[0].JUMLAHDATA == "0") {
                    if(cekpenerima11[0].JUMLAHDATA == "0") {
                        var penerima1 = "Nomor Tidak Diketahui";
                    }
                    else {
                        var penerima1 = ucwords(strtolower(cekpenerima12[0].PERSNM));
                    }  
                }
                else { 
                    var penerima1 = ucwords(strtolower(cekpenerima11[0].PERSNM));
                }
                var pesan0 = dataoutboxwa[i].TextDecoded;
                var pesan1 = pesan0.substr(0,120);   
                // var pesan2 = pesan1.replace("\n<br>","");   
                message += emot1 + " " +penerima1 + " - "+dataoutboxwa[i].DestinationNumber+"\n";
                message += "Pesan : "+pesan1;
                message += "\n\n";
            } 
        }
        
        connection.close();          
        return message;    
        return false;  
    }
    if(keyword=="outboxrestart") { 
        await connection.execute("UPDATE antrianpesan SET StatusCode = '-1'");
        var message = "Antrian WhatsApp Re-Send.";  
        message += "\n\n";         
        const [CekJumlahOutboxWaProcess] = await connection.execute("SELECT COUNT(StatusCode) AS JUMLAHNYA FROM `antrianpesan` WHERE antrianpesan.StatusCode = '-1'");       
        const [CekJumlahOutboxWaPending] = await connection.execute("SELECT COUNT(StatusCode) AS JUMLAHNYA FROM `antrianpesan` WHERE antrianpesan.StatusCode = '0'");         
        message += "*Antrian WhatsApp :* \n"+CekJumlahOutboxWaProcess[0].JUMLAHNYA+" diproses,\n"+CekJumlahOutboxWaPending[0].JUMLAHNYA+" pending"; 
        connection.close();        
        return message;     
        return false;  
    } 
    if(keyword=="outboxpending") { 
        await connection.execute("UPDATE antrianpesan SET StatusCode = '0'");
        var message = "Antrian WhatsApp Dipendingkan."; 
        message += "\n\n";              
        const [CekJumlahOutboxWaProcess] = await connection.execute("SELECT COUNT(StatusCode) AS JUMLAHNYA FROM `antrianpesan` WHERE antrianpesan.StatusCode = '-1'");       
        const [CekJumlahOutboxWaPending] = await connection.execute("SELECT COUNT(StatusCode) AS JUMLAHNYA FROM `antrianpesan` WHERE antrianpesan.StatusCode = '0'");         
        message += "*Antrian WhatsApp :* \n"+CekJumlahOutboxWaProcess[0].JUMLAHNYA+" diproses,\n"+CekJumlahOutboxWaPending[0].JUMLAHNYA+" pending";  
        connection.close();        
        return message;    
        return false;  
    }
    if(keyword=="cleanmyoutbox") {
        await connection.execute("DELETE FROM antrianpesan WHERE `DestinationNumber` = '"+phonenumber+"' AND `DestinationNumber` = '"+phonenumber2+"'");
        var message = "Semua Antrian WhatsApp Kamu sudah dihapus.";
        connection.close();
        return message;
        return false;
    } 
       
    else {
        const [rows] = await connection.execute('SELECT message FROM wa_reply WHERE keyword = ?', [keyword]);
        if(rows.length > 0) {
            return rows[0].message;                     
        }
        else {                      
            if(keyword=="hi" || keyword=="hallo") {   
                return messagehallo;                  
            }           
            else {              
                // Cek Chat Received                              
                const [cekchatreceived] = await connection.execute("SELECT COUNT(ID) AS JUMLAH FROM wa_received WHERE `phonenumber` = '"+phonenumber+"' AND date_inserted = '"+dateinserted+"'");       
                if(cekchatreceived[0].JUMLAH < 2) {                   
                    return messagelist;               
                    return false;   
                    connection.close();     
                }   
                else {

                }
            }        
        }   
    } 
}
module.exports = {
    createConnection,
    getReply
}