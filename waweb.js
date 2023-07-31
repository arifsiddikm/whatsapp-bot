const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const { body, validationResult } = require('express-validator');
const socketIO = require('socket.io');
const replace = require("replace");       
const path = require('path');  
const qrcode = require('qrcode');  
const $ = require('jquery'); 
const http = require('http');  
const FormData = require('form-data'); 
const fs = require('fs');
const { phoneNumberFormatter } = require('./helpers/formatter');
const fileUpload = require('express-fileupload');
const axios = require('axios');
const fetch = require('node-fetch');
const mime = require('mime-types');
const { exec, spawn } = require("child_process");   
const mysql = require('mysql2/promise'); 
const sleep = require('util').promisify(setTimeout);  

const port = process.env.PORT || 8000;

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(fileUpload({
  debug: false
}));

app.get('/', (req, res) => {
  res.sendFile('index.html', {
    root: __dirname
  });
});

const client = new Client({
  restartOnAuthFail: true,
  puppeteer: {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--single-process', // <- this one doesn't works in Windows
      '--disable-gpu'
    ],
  },
  authStrategy: new LocalAuth()
});


const db = require('./helpers/db');
// const { EditPhotoHandler } = require('./feature/edit_foto');
// const { ChatAIHandler } = require('./feature/chat_ai'); 

client.on('message', async (msg) => {

  if(msg.body=="clearmsg") {  
    await chat.clearMessages();   
  }

  const fromnumber = msg.from;      
  const contact = await msg.getContact();  
  const name2 = contact.pushname;   
  const phonenumber = '0'+fromnumber.substr(2,fromnumber.length-7);
  const mygroup = fromnumber.substr(fromnumber.length-4,4); 
  const keyword = msg.body.toLowerCase();       
  const keywordnolower = msg.body;          
  const keywordsubstr6 = msg.body.substr(0,6).toLowerCase();        
  const keywordsubstr7 = msg.body.substr(0,7).toLowerCase();        
  const keywordsubstr8 = msg.body.substr(0,8);    
  const keywordsubstr11 = msg.body.substr(0,11).toLowerCase();        
  const keywordsubstr17 = msg.body.substr(0,17);   
  const keywordsubstr4 = msg.body.substr(0,4);   
  const keywordsubstr13 = msg.body.substr(0,13);   
  const keyword2 = name2 + "|pisah|" + keyword + "|pisah|" + phonenumber;    
  const keywordnolower2 = name2 + "|pisah|" + keywordnolower + "|pisah|" + phonenumber;
  var answer = "";

  // Database Connection
  const createConnection = async () => {
    return await mysql.createConnection({
      host: 'localhost', user: '',  password: '', database: '',    
    })
  }
  const connection = await createConnection();                 
  // End Database Connection
  var phonenumbernew = "08xxxxxx";
  if(phonenumbernew=="08xxxxxx") {
    var isadmin = true;
  }
  else {var isadmin = false;}
  // Function Custom       
  function msgreplyperintahdiproses() {
    msg.reply("⏳Perintah sedang diproses, mohon ditunggu...");
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
  function ucwords (str) {
    return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
      return $1.toUpperCase();
    });
  } 
  function strtolower (str) {
    return (str+'').toLowerCase();  
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
  function editdateinserted4_2(propstanggal) {
    var pecahprops = propstanggal.split(" ");
    var tanggal = pecahprops[0].substr(8,2);
    var bulan = pecahprops[0].substr(5,2);
    var tahun = pecahprops[0].substr(0,4);
    return tanggal+' '+convert_month_eng_to_id2(bulan)+' '+tahun;
  }
  // End Function Custom
  const [hitdatapersonalmaster] = await connection.execute("SELECT DATA WHERE TABLEPERSONALKARYAWAN.NOTELP = '"+phonenumbernew+"' LIMIT 1");
  const [datapersonalmaster] = await connection.execute("SELECT DATA WHERE TABLEPERSONALKARYAWAN.NOTELP = '"+phonenumbernew+"' LIMIT 1");
  const [hitdatapersonalmastereksternal] = await connection.execute("SELECT DATA WHERE TABLEKARYAWAN.NOTELP = '"+phonenumbernew+"' LIMIT 1");
  const [datapersonalmastereksternal] = await connection.execute("SELECT DATA WHERE TABLEKARYAWAN.NOTELP = '"+phonenumbernew+"' LIMIT 1");
  if(hitdatapersonalmaster[0].JUMLAHPERSONAL == "0") {
    if(hitdatapersonalmastereksternal[0].TABLEPERSONALKARYAWANEKSTERNAL == "0") {
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
      var persno = datapersonalmastereksternal[0].PERSNO;
      var persnomgr = datapersonalmastereksternal[0].PERSNOMGR;
      var vendor = persno.substr(0,1);
      var persnm = datapersonalmastereksternal[0].PERSNM;
      var costctrno = datapersonalmastereksternal[0].PERSCOSTCTRNO;
      var costctrnm = datapersonalmastereksternal[0].COSTCTRNM;
      var admin = datapersonalmastereksternal[0].ADMIN;
      var cekjenisuser = "Eksternal";
    }
  }
  else {
    var vendor = "";
    var persno = datapersonalmaster[0].PERSNO;
    var persnomgr = datapersonalmaster[0].PERSNOMGR;
    var persnm = datapersonalmaster[0].PERSNM;
    var costctrno = datapersonalmaster[0].PERSCOSTCTRNO;
    var costctrnm = datapersonalmaster[0].COSTCTRNM;
    var admin = datapersonalmaster[0].ADMIN;
    var cekjenisuser = "YES";
  }
    
  const d = new Date();               
  // convertTZ(d, "Asia/Jakarta");
  let hh = d.getHours();      
  let mm = d.getMinutes();  
  let ss = d.getSeconds(); 
  let session = "AM";   
  if(hh == 0){hh = 12;} 
  if(hh > 12){hh = hh - 12;session = "PM";}
  hh = (hh < 10) ? "0" + hh : hh; 
  mm = (mm < 10) ? "0" + mm : mm;   
  ss = (ss < 10) ? "0" + ss : ss; 
  // let time = hh + ":" + mm + ":" + ss + " " + session;
  const yearnow = d.getFullYear();      
  var lastmonth0 = d.getMonth(); // 👈️ months are 0-based
  const monthnow = d.getMonth() + 1; // 👈️ months are 0-based   
  var datenow = String(d.getDate()).padStart(2, '0'); 
  if(lastmonth < 10) { var lastmonth = "0"+lastmonth0;} 
  else {var lastmonth = lastmonth0;}
  if(monthnow < 10) { var monthnow2 = "0"+monthnow;}          
  else {var monthnow2 = monthnow;}
  var todaydate2 = yearnow + '-' + monthnow2 + '-'; 
  var todaydate2forabsen1 = yearnow + '' + monthnow2 + '' + datenow;
  var todaydate2forabsen2 = monthnow2 + '/' + yearnow;
  var todaydate6 = yearnow + '' + monthnow;   
  var todaydate7 = yearnow + '' + lastmonth;    
  var todaydate8 = monthnow2 + "" + yearnow;
  var todaydate8_2 = yearnow + "0" + monthnow2;    
  var todaydate9 = lastmonth + "" + yearnow;      
  var dateinserted = yearnow + '-' + monthnow2 + '-' + datenow;
  var dateinserted2 = yearnow + '-' + monthnow2 + '-' + datenow + ' ' + hh + ':' + mm + ':' + ss;

  var datenowlengkap1 = yearnow+'-'+monthnow2+'-'+datenow;
  var datenowlengkap2 = yearnow+'-'+monthnow2+'-'+datenow+'-'+hh;     
  var datenowlengkap3 = yearnow+'-'+monthnow2+'-'+datenow+'-'+hh+'-'+mm;     
  var ServerSAPName = "sapnamexxx";          
  var IPAddressSAP = "192.168.xxx.xxx";  
    
  // Jika Kontak Chat grup, bukan japri;   
  if(mygroup=="g.us") {
    
  }
  // Jika Kontak Chat japri, bukan grup;   
  if(mygroup=="c.us") {

    // editbg edit background foto 
    // if (keyword.includes("editbg:")) { 
    //   await EditPhotoHandler(keyword, msg); 
    // } 
    
    // #tanya/question? tanya chatgpt
    // if (keyword.includes("tanya ai")) {   
    //   await ChatAIHandler(keyword, msg);    
    // }

    if (msg.body == 'ping') {
      msg.reply('pong');
    }     
    
    // Start Berita Terbaru             
    // Berita perusahaan                    
    if(keyword == "berita") {
      msgreplyperintahdiproses();
      exec(`node scrapingnewsperusahaan.js;`, function(err, stdout, stderr) {
        var pisahstdout = stdout.split("|pisah|");  
        var posttitle = pisahstdout[0]; 
        var postdate = pisahstdout[1];    
        var postlink = pisahstdout[2];    
        var postthumbnail = pisahstdout[3].toString();      
        var postcontent = pisahstdout[4].replace("\n","");              
        var postcontent = postcontent.replace("<br>","\n\n"); 
        var postcontent = postcontent.replace("<p>","\n\n");      
        var postcontent = postcontent.replace("</p>","");    
        var pesan = "*"+posttitle+"*"+"\n"+postcontent+"\n\n"+"Updated on "+postdate+".\n\nView more "+postlink+".\n\nAll News http://domainweb.com/news/.";  
        answer += postcontent;         
        setTimeout(function() {     
          var formdata = new FormData();                    
          formdata.append("number", phonenumber);             
          formdata.append("caption", pesan);           
          formdata.append("file", postthumbnail);     
          var requestOptions = {method: 'POST',body: formdata,redirect: 'follow'};    
          fetch("http://ipaddress:8000/send-media", requestOptions).then(response => response.text()).then(result => console.log(result)).catch(error => console.log('error', error));
        }, 3000);
      });
    }
    // Berita Instagram YES 
    if(keyword == "beritainstagram") {              
      msgreplyperintahdiproses();
      exec(`node scrapingnewsinstagramperusahaan.js;`, function(err, stdout, stderr) {       
        if(stdout.indexOf("datanyakosong")>=0) {    
          if(cekjenisuser=="Eksternal") {
            msg.reply("ℹ️Gagal mengambil berita, silahkan ketik ulang angka 🔟 kembali...");
          }
          else {
            msg.reply("ℹ️Gagal mengambil berita, silahkan ketik ulang angka 1️⃣5️⃣ kembali...");
          } 
        }
        else {
          var pisahstdout = stdout.split("|pisah|");
          var postthumbnail2 = pisahstdout[0];
          var postcaption2 = pisahstdout[1];              
          var postlink2 = pisahstdout[2];
          var pesan = postcaption2+"\n\nView more "+postlink2+".\n\nAll News https://instagram.com/igperusahaan/.";
          answer += postcaption2;
          setTimeout(function() {
            var formdata = new FormData();
            formdata.append("number", phonenumber);
            formdata.append("caption", pesan);             
            formdata.append("file", postthumbnail2);       
            var requestOptions = {method: 'POST',body: formdata,redirect: 'follow'};
            fetch("http://ipaddress:8000/send-media", requestOptions).then(response => response.text()).then(result => console.log(result)).catch(error => console.log('error', error));
          }, 4000);
        } 
      });
    } 
    // End Start Berita Terbaru 

    // Start Webhook SlipGaji
    if(keyword=="slipgaji") {  
      const [datapersonal] = await connection.execute("SELECT DATA"); 
      const [ceklastperiode] = await connection.execute("SELECT DATA");  
      var payperiod0 = ceklastperiode[0].PAYPERIOD;            
      var payperiod = payperiod0.substr(4,2) +""+ payperiod0.substr(0,4); 
      var paytype = ceklastperiode[0].PAYTYPE;    
      if(paytype=="1") {var paytypename = "Regular";} 
      
      const [cekslipgaji] = await connection.execute("SELECT DATA");   
      if(cekslipgaji.length > 0) {
        var tanggalslipgaji = payperiod;  
      }       
      else {    
        var tanggalslipgaji = payperiod;  
      } 
      if(datapersonal.length > 0) {    
        msg.reply("⏳Bot akan mengirim lampiran SlipGaji Anda, waktu pengiriman lampiran berjalan kurang lebih 10 detik, mohon ditunggu...");
        var nama0 = ucwords(strtolower(datapersonal[0].PERSNM));
        var nama2 = ucwords(strtolower(datapersonal[0].PERSNM));
        var nama = nama0.replace(" ","_");     
        var nick = datapersonal[0].ID;     
        var idgaji = paytype;
        const todays_date = new Date();              
        var waktu = todays_date.getTime();  
        fetch("http://ipaddress:8080/slipgaji/"+nama+"/"+nick+"/"+tanggalslipgaji+"/"+idgaji+"/"+waktu+"").then(res => res.json()).then(result => {}).catch(err => {}); 
        var captionslipgaji = "SlipGaji "+paytypename+" "+nama2+" "+convert_month_eng_to_id2(payperiod0.substr(4,2))+" "+payperiod0.substr(0,4);
        var filenamepdf = "SlipGaji_"+nama+"_"+tanggalslipgaji+"_"+waktu+".pdf";
        answer += captionslipgaji;
        setTimeout(function() {     
          var formdata = new FormData();                 
          formdata.append("number", phonenumber);            
          formdata.append("caption", captionslipgaji);           
          formdata.append("file", "http://domainweb.com/waweb/files/slip/"+filenamepdf);   
          var requestOptions = {method: 'POST',body: formdata,redirect: 'follow'};  
          fetch("http://ipaddress:8000/send-media", requestOptions).then(response => response.text()).then(result => console.log(result)).catch(error => console.log('error', error));   
        }, 8000);     
      }     
    }               
    // End Webhook SlipGaji   

    // Ketik 1 untuk mengirim file APK
    if(keyword == "1" || keyword == "1️⃣") {
      const fileUrl = "http://domainweb.com/APKperusahaan.apk";
      let mimetype;
      const attachment = await axios.get(fileUrl, {
        responseType: 'arraybuffer'
      }).then(response => {
        mimetype = response.headers['content-type'];
        return response.data.toString('base64');
      });
      const media = new MessageMedia(mimetype, attachment, 'perusahaan.apk'); 
      client.sendMessage(msg.from, "Berikut File Aplikasi perusahaan:"); 
      client.sendMessage(msg.from, media);
      answer += "perusahaan.apk";
    }

    // Start Kurs Mata Uang & Pajak
    else if(keyword == "kurs") {
      msgreplyperintahdiproses();
      exec(`node kursforwhatsapp.js;`, function(err, stdout, stderr) {
        client.sendMessage(msg.from, stdout);  
      });
    }
    // End Kurs Mata Uang & Pajak

    else {
      // Start Webhook Admin
      if(fromnumber == "6289514392694@c.us" || fromnumber == "628174914484@c.us" || fromnumber == "62859106534443@c.us") { 

        if(keyword == "ssdashboard") {              
          msgreplyperintahdiproses();               
          const fileUrl = "http://domainweb.com/files/ssdashboard/"+datenowlengkap2+".png";
          const path = "files/ssdashboard/"+datenowlengkap2+".png";
          try {   
            if (fs.existsSync(path)) {  
              let mimetype;                                             
              const attachment = await axios.get(fileUrl, {   
                responseType: 'arraybuffer'
              }).then(response => {   
                mimetype = response.headers['content-type']; 
                return response.data.toString('base64');  
              });     
              const media = new MessageMedia(mimetype, attachment, '');     
              client.sendMessage(msg.from, media);
            } 
            else {      
              fetch("http://ipaddress:8080/ssdashboard/"+datenowlengkap2).then(res => res.json()).then(result => {}).catch(err => {});  
              client.sendMessage(msg.from, "⏳Karena file masih belum ada, akan discreenshot dulu oleh sistem kurang lebih 40detik, mohon ditunggu...");      
              await sleep(40000);     
              let mimetype;                                             
              const attachment = await axios.get(fileUrl, {   
                responseType: 'arraybuffer'
              }).then(response => {   
                mimetype = response.headers['content-type']; 
                return response.data.toString('base64');  
              });     
              const media = new MessageMedia(mimetype, attachment, '');     
              client.sendMessage(msg.from, media);
            }   
          } catch(err) {}   
        }
        // Reset Password User  
        else if(keyword.substr(0,14)=="resetpassuser:") {    
          var pecahkeyword1 = keyword.split("resetpassuser:");    
          var keywordnew = pecahkeyword1[1].trim();          
          // Cek jumlah wp_users
          const [cekdatauser] = await connection.execute("SELECT DATALIMIT 1");   
          const [cekdatauser1] = await connection.execute("SELECT DATA");  
          const [cekdatauser2] = await connection.execute("SELECT DATA");    
          if(cekdatauser1.length>0) {   
            if(cekdatauser1[0].NOTELP.substr(0,2)=='08') {
              var nowhatsapp = "62"+cekdatauser1[0].NOTELP.substr(1,9999999999);  
            } 
            else if(cekdatauser1[0].NOTELP.substr(0,3)=='628') {
              var nowhatsapp = cekdatauser1[0].NOTELP;  
            } 
            else {
              var nowhatsapp = cekdatauser1[0].NOTELP;  
            } 
            var notelppengguna = nowhatsapp + "@c.us";
          } 
          else {
            if(cekdatauser2[0].NOTELP.substr(0,2)=='08') {
              var nowhatsapp = "62"+cekdatauser2[0].NOTELP.substr(1,9999999999);
            } 
            else if(cekdatauser2[0].NOTELP.substr(0,3)=='628') {
              var nowhatsapp = cekdatauser2[0].NOTELP;  
            }
            else {
              var nowhatsapp = cekdatauser2[0].NOTELP;  
            }
            var notelppengguna = nowhatsapp + "@c.us";
          }
          if(cekdatauser.length < 1) {  
              var message1 = "ℹ️ Akun tidak ditemukan, harap masukkan username dengan benar ^_^";      
          } 
          else {        
              // Update password    
              await connection.execute("UPDATE QUERY "); 
              var message1 = "✅ Kata Sandi dari Akun dengan Username *"+keywordnew+"* sudah diperbarui, silahkan Login dengan Detail Akun di bawah ini:\n\n*Detail Akun:*\n*Username :* "+keywordnew+"\n*Password :* newpass123";    
              client.sendMessage(notelppengguna, message1);
              client.sendMessage(msg.from, "Kata Sandi akun sudah diganti dan informasi sudah dikirimkan kepada pengguna tersebut, silahkan kirimkan pesan di bawah ini, jika informasi tidak tersampaikan kepada pengguna.");        
              client.sendMessage(msg.from, message1);   
          }
        }
        // Manage SAP        
        else if(keyword == "#1") {    
          msgreplyperintahdiproses();
          exec(`sudo sshpass -pPassword "`+ServerSAPName+`" ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -o LogLevel=quiet -C user@`+IPAddressSAP+` ". /user/filecommand.sh"`, function(err, stdout, stderr) { 
            msg.reply(stdout); 
          }); 
        }
        else {     
          if(keywordsubstr13 == "backupfolder:") {          
            const foldername = msg.body.substr(13,99999999); 
            msgreplyperintahdiproses();
            exec(`cd ..;zip -r `+foldername+`-bak`+datenowlengkap1+`.zip /dir/`+foldername+`/;`, function(err, stdout, stderr) {       
              exec(`cd ..;ls;`, function(err2, stdout2, stderr2) { 
                msg.reply("Folder "+foldername+" sudah dibackup dan dikompres...");   
                msg.reply(stdout2);             
              }); 
            }); 
          }
          else {  
            const replyMessage = await db.getReply(keyword2);        
            if(replyMessage !== false) {                        
              if(keyword=="hi" || keyword=="hallo") {        
                const fileUrl = "http://domainweb.com/assets/image/iconkpas.jpg";               
                let mimetype;           
                const attachment = await axios.get(fileUrl, {
                  responseType: 'arraybuffer'
                }).then(response => {   
                  mimetype = response.headers['content-type']; 
                  return response.data.toString('base64');  
                });   
                const media = new MessageMedia(mimetype, attachment, '');     
                client.sendMessage(msg.from, media);        
                var varmsgtimeout = 1500;       
              } 
              else {
                var varmsgtimeout = 0;
              }
              if(msg.body!=="/sticker" || msg.body!=="/pdf") { 
                setTimeout(function() {       
                  client.sendMessage(msg.from, replyMessage); 
                }, varmsgtimeout); 
              }
            }
          }
        }
      }
      // End Webhook Admin  

      // Other Webhook  
      else {    
          const replyMessage = await db.getReply(keyword2);  
          if(replyMessage !== false) {      
            client.sendMessage(msg.from, replyMessage);   
            var msg = replyMessage;     
            answer += msg;  
          }
      }
      // End Other Webhook
    }

  }

  // NOTE!
  // UNCOMMENT THE SCRIPT BELOW IF YOU WANT TO SAVE THE MESSAGE MEDIA FILES
  // Downloading media
  // if (msg.hasMedia) {
  //   msg.downloadMedia().then(media => {
  //     // To better understanding
  //     // Please look at the console what data we get
  //     console.log(media);

  //     if (media) {
  //       // The folder to store: change as you want!
  //       // Create if not exists
  //       const mediaPath = './downloaded-media/';

  //       if (!fs.existsSync(mediaPath)) {
  //         fs.mkdirSync(mediaPath);
  //       }

  //       // Get the file extension by mime-type
  //       const extension = mime.extension(media.mimetype);
        
  //       // Filename: change as you want! 
  //       // I will use the time for this example
  //       // Why not use media.filename? Because the value is not certain exists
  //       const filename = new Date().getTime();

  //       const fullFilename = mediaPath + filename + '.' + extension;

  //       // Save to file
  //       try {
  //         fs.writeFileSync(fullFilename, media.data, { encoding: 'base64' }); 
  //         console.log('File downloaded successfully!', fullFilename);
  //       } catch (err) {
  //         console.log('Failed to save the file:', err);
  //       }
  //     }
  //   });
  // }
});

client.initialize();

// Socket IO
io.on('connection', function(socket) {
  socket.emit('message', 'Connecting...');
  client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode.toDataURL(qr, (err, url) => {
      socket.emit('qr', url);
      socket.emit('message', 'QR Code received, scan please!');
    });
  });

  client.on('ready', () => {
    socket.emit('ready', 'Whatsapp is ready!');
    socket.emit('message', 'Whatsapp is ready!');
  });

  client.on('authenticated', () => {
    socket.emit('authenticated', 'Whatsapp is authenticated!');
    socket.emit('message', 'Whatsapp is authenticated!');
    console.log('AUTHENTICATED');
  });

  client.on('auth_failure', function(session) {
    socket.emit('message', 'Auth failure, restarting...');
  });

  client.on('disconnected', (reason) => {
    socket.emit('message', 'Whatsapp is disconnected!');
    client.destroy();
    client.initialize();
  });
});


const checkRegisteredNumber = async function(number) {
  const isRegistered = await client.isRegisteredUser(number);
  return isRegistered;
}

// Send message
app.post('/send-pesan-dong', [
  body('number').notEmpty(),
  body('message').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req).formatWith(({
    msg
  }) => {
    return msg;
  });

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.mapped()
    });
  }

  const number = phoneNumberFormatter(req.body.number);
  const message = req.body.message;

  // const isRegisteredNumber = await checkRegisteredNumber(number);

  // if (!isRegisteredNumber) {
  //   return res.status(422).json({
  //     status: false,
  //     message: 'The number is not registered'
  //   });
  // }

  client.sendMessage(number, message).then(response => {
    res.status(200).json({
      status: true,
      response: response
    });
  }).catch(err => {
    res.status(500).json({
      status: false,
      response: err
    });
  });
});

// Send media
app.post('/send-media', async (req, res) => {
  const number = phoneNumberFormatter(req.body.number);
  const caption = req.body.caption;
  const fileUrl = req.body.file;

  // const media = MessageMedia.fromFilePath('./image-example.png');
  // const file = req.files.file;
  // const media = new MessageMedia(file.mimetype, file.data.toString('base64'), file.name);
  let mimetype;
  const attachment = await axios.get(fileUrl, {
    responseType: 'arraybuffer'
  }).then(response => {
    mimetype = response.headers['content-type'];
    return response.data.toString('base64');
  });

  const media = new MessageMedia(mimetype, attachment, 'Media');

  client.sendMessage(number, media, {
    caption: caption
  }).then(response => {
    res.status(200).json({
      status: true,
      response: response
    });
  }).catch(err => {
    res.status(500).json({
      status: false,
      response: err
    });
  });
});

const findGroupByName = async function(name) {
  const group = await client.getChats().then(chats => {
    return chats.find(chat => 
      chat.isGroup && chat.name.toLowerCase() == name.toLowerCase()
    );
  });
  return group;
}

// Send message to group
// You can use chatID or group name, yea!
app.post('/send-group-message', [
  body('id').custom((value, { req }) => {
    if (!value && !req.body.name) {
      throw new Error('Invalid value, you can use `id` or `name`');
    }
    return true;
  }),
  body('message').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req).formatWith(({
    msg
  }) => {
    return msg;
  });

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.mapped()
    });
  }

  let chatId = req.body.id;
  const groupName = req.body.name;
  const message = req.body.message;

  // Find the group by name
  if (!chatId) {
    const group = await findGroupByName(groupName);
    if (!group) {
      return res.status(422).json({
        status: false,
        message: 'No group found with name: ' + groupName
      });
    }
    chatId = group.id._serialized;
  }

  client.sendMessage(chatId, message).then(response => {
    res.status(200).json({
      status: true,
      response: response
    });
  }).catch(err => {
    res.status(500).json({
      status: false,
      response: err
    });
  });
});

// Clearing message on spesific chat
app.post('/clear-message', [
  body('number').notEmpty(),
], async (req, res) => {
  const errors = validationResult(req).formatWith(({
    msg
  }) => {
    return msg;
  });

  if (!errors.isEmpty()) {
    return res.status(422).json({
      status: false,
      message: errors.mapped()
    });
  }

  const number = phoneNumberFormatter(req.body.number);

  const isRegisteredNumber = await checkRegisteredNumber(number);

  if (!isRegisteredNumber) {
    return res.status(422).json({
      status: false,
      message: 'The number is not registered'
    });
  }

  const chat = await client.getChatById(number);
  
  chat.clearMessages().then(status => {
    res.status(200).json({
      status: true,
      response: status
    });
  }).catch(err => {
    res.status(500).json({
      status: false,
      response: err
    });
  })
});

server.listen(port, function() {
  console.log('App running on *: ' + port);
});
