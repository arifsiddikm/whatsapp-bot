const puppeteer = require("puppeteer");     
const path = require('path');     
const express = require('express');              
const app = express();    
const sleep = require('util').promisify(setTimeout);  
const fetch = require('node-fetch');                
const fs = require('fs');                
const { exec, spawn } = require("child_process");    

(async () => {
    const fs = require('fs');
    exec(`rm /files/kursforwhatsapp.txt`, function(err, stdout, stderr) {});     
    const browser = await puppeteer.launch({
      args: ['--no-sandbox'],   
      timeout: 10000, 
    });
    const page = await browser.newPage();
    page.setViewport({width: 1366, height: 768});     
    var pesan = "";   
    var nilaikursusdtoidr0 = "";   
    var waktukurs = "";  
    var waktukursmatauang = "";  
    var waktukurspajak = "";  

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
    const yearnow = d.getFullYear();
    var lastmonth0 = d.getMonth(); // 👈️ months are 0-based
    const monthnow = d.getMonth() + 1; // 👈️ months are 0-based   
    var datenow = String(d.getDate()).padStart(2, '0');
    if(monthnow < 10) { var monthnow2 = "0"+monthnow;}
    else {var monthnow2 = monthnow;}
    var datenowlengkap5 = datenow+'.'+monthnow2+'.'+yearnow;
    waktukurspajak += datenowlengkap5;

    await page.goto("https://datacenter.ortax.org/ortax/kursbi/show/jisdor");  
    // console.log("Kurs Mata Uang Indonesia \n"); 
    
    const tdheader1 = await page.evaluate(() => {
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
      const yearnow = d.getFullYear();
      var lastmonth0 = d.getMonth(); // 👈️ months are 0-based
      const monthnow = d.getMonth() + 1; // 👈️ months are 0-based   
      var datenow = String(d.getDate()).padStart(2, '0');
      if(monthnow < 10) { var monthnow2 = "0"+monthnow;}
      else {var monthnow2 = monthnow;}
      var datenowlengkap5 = datenow+'.'+monthnow2+'.'+yearnow;
      var nilaikursnya = "";  
      var asudansduasdn = 0;
      const data1 = document.querySelectorAll("#table-kursbi tbody tr");
      // USD to IDR
      var no = 0;
      data1.forEach((row1) => {
        var noo = no++; 
        const td = row1.querySelectorAll("td"); 
        const tanggalKurs = td[0]; 
        var pecahtanggalkurs = tanggalKurs.innerText.split(" "); 
        var tanggal = pecahtanggalkurs[0]; 
        var bulan = pecahtanggalkurs[1]; 
        if(bulan=="Januari") {var bulannew = "01";} 
        else if(bulan=="Februari") {var bulannew = "02";}
        else if(bulan=="Maret") {var bulannew = "03";}
        else if(bulan=="April") {var bulannew = "04";}
        else if(bulan=="Mei") {var bulannew = "05";}
        else if(bulan=="Juni") {var bulannew = "06";}
        else if(bulan=="Juli") {var bulannew = "07";}
        else if(bulan=="Agustus") {var bulannew = "08";}
        else if(bulan=="September") {var bulannew = "09";}
        else if(bulan=="Oktober") {var bulannew = "10";}
        else if(bulan=="November") {var bulannew = "11";}
        else if(bulan=="Desember") {var bulannew = "12";}
        else {var bulannew="";}
        var tahun = pecahtanggalkurs[2]; 
        var datenownew = tanggal +"."+ bulannew +"."+ tahun;
        const nilaiKurs = td[1]; 
        // grab kurs mata uang
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(noo==0) {
          // console.log(noo)
          if(nilaiKurs.innerText==0.00 || nilaiKurs.innerText=="0,00") {
            asudansduasdn += 1;
          }
          else {
            nilaikursnya += "USD  ➡️ IDR : "+nilaiKurs.innerText+"\n";
          }
        }
        if(noo==1) {
          // console.log(noo)
          if(asudansduasdn > 0) {
            nilaikursnya += "USD  ➡️ IDR : "+nilaiKurs.innerText+"\n";
          }
        }
      });   
      return nilaikursnya; 
    });

    await page.goto("https://datacenter.ortax.org/ortax/kursbi/show/jisdor");  
    sleep(2000);
    const cekwaktukurs = await page.evaluate(() => {
      var waktukurs0 = "";  
      const data1 = document.querySelectorAll("#table-kursbi tbody tr");
      // USD to IDR
      var no = 0;
      data1.forEach((row1) => {
        var noo = no++; 
        const td = row1.querySelectorAll("td"); 
        const tanggalKurs = td[0]; 
        var pecahtanggalkurs = tanggalKurs.innerText.split(" "); 
        var tanggal = pecahtanggalkurs[0]; 
        var bulan = pecahtanggalkurs[1]; 
        if(bulan=="Januari") {var bulannew = "01";} 
        else if(bulan=="Februari") {var bulannew = "02";}
        else if(bulan=="Maret") {var bulannew = "03";}
        else if(bulan=="April") {var bulannew = "04";}
        else if(bulan=="Mei") {var bulannew = "05";}
        else if(bulan=="Juni") {var bulannew = "06";}
        else if(bulan=="Juli") {var bulannew = "07";}
        else if(bulan=="Agustus") {var bulannew = "08";}
        else if(bulan=="September") {var bulannew = "09";}
        else if(bulan=="Oktober") {var bulannew = "10";}
        else if(bulan=="November") {var bulannew = "11";}
        else if(bulan=="Desember") {var bulannew = "12";}
        else {var bulannew="";}  
        var tahun = pecahtanggalkurs[2]; 
        var datenownew = tanggal +"."+ bulannew +"."+ tahun;
        // grab kurs mata uang 
        if(noo==0) { 
          waktukurs0 += datenownew
        }
      });   
      return waktukurs0; 
    });

    await page.goto("https://datacenter.ortax.org/ortax/kursbi/show/jisdor");  
    sleep(2000);
    const ceknilaikursusdtoidr = await page.evaluate(() => {
      var nilaikursusdtoidr = "";  
      var asudansduasdn = 0;
      const data1 = document.querySelectorAll("#table-kursbi tbody tr");
      // USD to IDR
      var no = 0; 
      data1.forEach((row1) => { 
        var noo = no++; 
        const td = row1.querySelectorAll("td"); 
        const nilaiKurs = td[1]; 
        // grab kurs mata uang
        if(noo==0) {
          if(nilaiKurs.innerText==0.00 || nilaiKurs.innerText=="0,00") {
            asudansduasdn += 1;
          }  
          else { 
            nilaikursusdtoidr = nilaiKurs.innerText;
          }
        }
        if(noo==1) {
          if(asudansduasdn > 0) {
            nilaikursusdtoidr = nilaiKurs.innerText;
          }
        }
      });   
      return nilaikursusdtoidr; 
    });

    nilaikursusdtoidr0 += ceknilaikursusdtoidr;
    waktukurs += cekwaktukurs;
    waktukursmatauang += cekwaktukurs;

    await page.goto("https://datacenter.ortax.org/ortax/kursbi/list");
    sleep(2000);
    const tdheader = await page.evaluate((nilaikursusdtoidr0, waktukurs) => {
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
      const yearnow = d.getFullYear();
      var lastmonth0 = d.getMonth(); // 👈️ months are 0-based
      const monthnow = d.getMonth() + 1; // 👈️ months are 0-based   
      var datenow = String(d.getDate()).padStart(2, '0');
      if(monthnow < 10) { var monthnow2 = "0"+monthnow;}
      else {var monthnow2 = monthnow;}
      var datenowlengkap5 = datenow+'.'+monthnow2+'.'+yearnow;
      var nilaikursnya1 = "";  
      var nilaikursnya = "";  
      var kursmatauangusdtoidrold = "";  
      var kursmatauangusdtoidr = "";  
      const data = document.querySelectorAll("#table-kursbi tbody tr");
      // USD to IDR
      // data.forEach((row1) => {
      //   const td = row1.querySelectorAll("td");
      //   const mataUang1 = td[1];  
      //   const nilaiKurs = td[4]; 
      //   const mataUang1text = mataUang1.querySelector("a");
      //   // grab kurs mata uang 
      //   // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
      //   if(mataUang1text.innerText=="USD") { 
      //     nilaikursnya += "M;"+datenowlengkap5+";;1;"+mataUang1text.innerText+";"+nilaiKurs.innerText+";1000;IDR;\n";
      //   } 
      // }); 
      // USD to IDR
      // JPY to IDR
      data.forEach((row1) => { 
        const td = row1.querySelectorAll("td"); 
        const mataUang1 = td[1];  
        const nilaiKurs = td[4]; 
        const mataUang1text = mataUang1.querySelector("a");
        // grab kurs mata uang
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="JPY") { 
          var kursjpy0 = nilaiKurs.innerText.replaceAll(",","");
          var kursjpy1 = kursjpy0.replaceAll(".","");   
          var kursjpy2 = parseInt(kursjpy1) * 10;
          var kursjpy = kursjpy2.toString().substr(0,3) + "." + kursjpy2.toString().substr(3,9999);
          nilaikursnya += "JPY   ➡️ IDR : "+kursjpy+"\n";
        }
      });
      // JPY to IDR
      // SGD to IDR
      data.forEach((row1) => {
        const td = row1.querySelectorAll("td");
        const mataUang1 = td[1];   
        const nilaiKurs = td[4]; 
        const mataUang1text = mataUang1.querySelector("a");
        // grab kurs mata uang 
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="SGD") { 
          nilaikursnya += "SGD  ➡️ IDR : "+nilaiKurs.innerText+"\n";
        } 
      }); 
      // SGD to IDR
      // EUR to IDR
      data.forEach((row1) => {
        const td = row1.querySelectorAll("td");
        const mataUang1 = td[1];   
        const nilaiKurs = td[4]; 
        const mataUang1text = mataUang1.querySelector("a");
        // grab kurs mata uang 
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="EUR") { 
            nilaikursnya += "EUR  ➡️ IDR : "+nilaiKurs.innerText+"\n";
        } 
      }); 
      // EUR to IDR
      // GBP to IDR
      data.forEach((row1) => {
        const td = row1.querySelectorAll("td");
        const mataUang1 = td[1];   
        const nilaiKurs = td[4]; 
        const mataUang1text = mataUang1.querySelector("a");
        // grab kurs mata uang 
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="GBP") { 
            nilaikursnya += "GBP  ➡️ IDR : "+nilaiKurs.innerText+"\n";
        } 
      }); 
      // GBP to IDR
      // AUD to IDR
      data.forEach((row1) => {
        const td = row1.querySelectorAll("td");
        const mataUang1 = td[1];   
        const nilaiKurs = td[4]; 
        const mataUang1text = mataUang1.querySelector("a");
        // grab kurs mata uang 
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="AUD") { 
            nilaikursnya += "AUD  ➡️ IDR : "+nilaiKurs.innerText+"\n";
        } 
      }); 
      // AUD to IDR
      // SEK to IDR
      data.forEach((row1) => {
        const td = row1.querySelectorAll("td");
        const mataUang1 = td[1];   
        const nilaiKurs = td[4]; 
        const mataUang1text = mataUang1.querySelector("a");
        // grab kurs mata uang 
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="SEK") { 
            nilaikursnya += "SEK   ➡️ IDR : "+nilaiKurs.innerText+"\n";
        } 
      }); 
      // SEK to IDR
      // CNY to IDR
      data.forEach((row1) => {
        const td = row1.querySelectorAll("td");
        const mataUang1 = td[1];   
        const nilaiKurs = td[4]; 
        const mataUang1text = mataUang1.querySelector("a");
        // grab kurs mata uang  
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="CNY") {
            nilaikursnya += "CNY  ➡️ IDR : "+nilaiKurs.innerText+"\n";
        }
      }); 
      // CNY to IDR

      data.forEach((row1) => {
        const td = row1.querySelectorAll("td");
        const mataUang1 = td[1];  
        const nilaiKurs = td[4]; 
        const mataUang1text = mataUang1.querySelector("a");
        // Hitung Kurs Lainnya 
        // Deklarasikan kursusdtoidr   
        if(mataUang1text.innerText=="USD") {
          // var nilaikursusdtoidr0 = ""; 
          // fs.readFile('nilaikursusdtoidr0.txt', 'utf8', function(err, data) {
          //   nilaikursusdtoidr0 += data; 
          // }); 
          // kursmatauangusdtoidrold += nilaiKurs.innerText; 
          // var kursmatauangusdtoidr0 = nilaiKurs.innerText.replace(",",""); 
          kursmatauangusdtoidrold += nilaikursusdtoidr0; 
          var kursmatauangusdtoidr0 = nilaikursusdtoidr0.replace(",",""); 
          kursmatauangusdtoidr += kursmatauangusdtoidr0.replace(".",""); 
        }
      });

      // IDR to USD
      // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        nilaikursnya += "IDR    ➡️ USD : "+kursmatauangusdtoidrold+"\n";
      // IDR to USD 
      
      // JPY to USD
      data.forEach((row1) => {
        const td = row1.querySelectorAll("td");
        const mataUang1 = td[1];   
        const nilaiKurs = td[4];  
        const mataUang1text = mataUang1.querySelector("a");
        // Hitung Kurs Lainnya 
        // kurs jpy to usd = C9/C11*1
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="JPY") { 
          var kursjpy0 = nilaiKurs.innerText.replaceAll(",","");  
          var kursjpy1 = kursjpy0.replaceAll(".","");   
          var kursjpy2 = ((parseInt(kursmatauangusdtoidr) / parseInt(kursjpy1) * 100)).toFixed(5);
            nilaikursnya += "JPY   ➡️ USD : "+kursjpy2+"\n";
        }
      });
      // JPY to USD
      // SGD to USD
      data.forEach((row1) => {
        const td = row1.querySelectorAll("td");
        const mataUang1 = td[1];  
        const nilaiKurs = td[4]; 
        const mataUang1text = mataUang1.querySelector("a");
        // Hitung Kurs Lainnya 
        // kurs sgd to usd = C9/C11*1
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="SGD") { 
          var kurssgd0 = nilaiKurs.innerText.replaceAll(",",""); 
          var kurssgd1 = kurssgd0.replaceAll(".","");  
          var kurssgd2 = (parseInt(kursmatauangusdtoidr) / parseInt(kurssgd1)).toFixed(5);
            nilaikursnya += "SGD  ➡️ USD : "+kurssgd2+"\n"; 
        }
      });
      // SGD to USD
      // EUR to USD
      data.forEach((row1) => {
        const td = row1.querySelectorAll("td");
        const mataUang1 = td[1];  
        const nilaiKurs = td[4]; 
        const mataUang1text = mataUang1.querySelector("a");
        // Hitung Kurs Lainnya 
        // kurs eur to usd = C12/C9
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="EUR") {
          var kurseur0 = nilaiKurs.innerText.replaceAll(",","");
          var kurseur1 = kurseur0.replaceAll(".",""); 
          var kurseur2 = (parseInt(kurseur1) / parseInt(kursmatauangusdtoidr)).toFixed(5);
            nilaikursnya += "EUR  ➡️ USD : "+kurseur2+"\n";
        }
      });
      // EUR to USD
      // GBP to USD
      data.forEach((row1) => {
        const td = row1.querySelectorAll("td");
        const mataUang1 = td[1];  
        const nilaiKurs = td[4]; 
        const mataUang1text = mataUang1.querySelector("a");
        // Hitung Kurs Lainnya
        // kurs gbp to usd = C13/C9
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="GBP") { 
          var kursgbp0 = nilaiKurs.innerText.replaceAll(",",""); 
          var kursgbp1 = kursgbp0.replaceAll(".",""); 
          var kursgbp2 = (parseInt(kursgbp1) / parseInt(kursmatauangusdtoidr)).toFixed(5); 
            nilaikursnya += "GBP  ➡️ USD : "+kursgbp2+"\n";
        }
      });
      // GBP to USD
      // AUD to USD
      data.forEach((row1) => {
        const td = row1.querySelectorAll("td");
        const mataUang1 = td[1];  
        const nilaiKurs = td[4]; 
        const mataUang1text = mataUang1.querySelector("a");
        // Hitung Kurs Lainnya
        // kurs aud to usd = C12/C9
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="AUD") {
          var kursaud0 = nilaiKurs.innerText.replaceAll(",","");
          var kursaud1 = kursaud0.replaceAll(".",""); 
          var kursaud2 = (parseInt(kursmatauangusdtoidr) / parseInt(kursaud1)).toFixed(5);
            nilaikursnya += "AUD  ➡️ USD : "+kursaud2+"\n";
        }
      });
      // AUD to USD
      // SEK to USD
      data.forEach((row1) => {
        const td = row1.querySelectorAll("td");
        const mataUang1 = td[1];  
        const nilaiKurs = td[4];
        const mataUang1text = mataUang1.querySelector("a");
        // Hitung Kurs Lainnya
        // kurs sek to usd = C12/C9
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="SEK") {
          var kurssek0 = nilaiKurs.innerText.replaceAll(",","");
          var kurssek1 = kurssek0.replaceAll(".","");
          var kurssek2 = (parseInt(kursmatauangusdtoidr) / parseInt(kurssek1)).toFixed(5);
            nilaikursnya += "SEK   ➡️ USD : "+kurssek2+"\n";
        }
      });
      // SEK to USD
      // CNY to USD
      data.forEach((row1) => {
        const td = row1.querySelectorAll("td");
        const mataUang1 = td[1];  
        const nilaiKurs = td[4]; 
        const mataUang1text = mataUang1.querySelector("a");
        // Hitung Kurs Lainnya
        // kurs cny to usd = C12/C9
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="CNY") {
          var kurscny0 = nilaiKurs.innerText.replaceAll(",","");
          var kurscny1 = kurscny0.replaceAll(".",""); 
          var kurscny2 = (parseInt(kursmatauangusdtoidr) / parseInt(kurscny1)).toFixed(5);
            nilaikursnya += "CNY  ➡️ USD : "+kurscny2+"\n";
        }
      }); 
      // CNY to USD
      return nilaikursnya;  
    }, nilaikursusdtoidr0, waktukurs);


    // Cek Kurs Pajak
    await page.goto("https://datacenter.ortax.org/ortax/kursmk/list");  
    sleep(2000);
    const cekkurspajak = await page.evaluate(() => { 
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
        const yearnow = d.getFullYear();         
        var lastmonth0 = d.getMonth(); // 👈️ months are 0-based
        const monthnow = d.getMonth() + 1; // 👈️ months are 0-based   
        var datenow = String(d.getDate()).padStart(2, '0');
        if(monthnow < 10) { var monthnow2 = "0"+monthnow;}
        else {var monthnow2 = monthnow;}
        var datenowlengkap5 = datenow+'.'+monthnow2+'.'+yearnow; 
        const data = document.querySelectorAll("#table-kursmk tbody tr");
        var nilaikursnya = ""; 
        var kursmatauangusdtoidrold = "";  
        var kursmatauangusdtoidr = "";  
        // USD to IDR
        data.forEach((row1) => {
        const td            = row1.querySelectorAll("td");
        const th            = row1.querySelectorAll("th");
        const mataUang1     = td[1];
        const nilaiKurs     = th[0];
        const mataUang1text = mataUang1.querySelector("a");
        // grab kurs mata uang 
        if(mataUang1text.innerText=="USD") {
            nilaikursnya += "USD ➡️ IDR : "+nilaiKurs.innerText+"\n";
        } 
        }); 
        // USD to IDR
        // JPY to IDR
        data.forEach((row1) => { 
        const td            = row1.querySelectorAll("td");
        const th            = row1.querySelectorAll("th");
        const mataUang1     = td[1];
        const nilaiKurs     = th[0];
        const mataUang1text = mataUang1.querySelector("a");
        // grab kurs mata uang
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="JPY") { 
            var kursjpy0 = nilaiKurs.innerText.replaceAll(",","");
            var kursjpy1 = kursjpy0.replaceAll(".","");   
            var kursjpy2 = parseInt(kursjpy1) * 10;
            var kursjpy = kursjpy2.toString().substr(0,3) + "." + kursjpy2.toString().substr(3,9999);
            nilaikursnya += "JPY  ➡️ IDR : "+kursjpy+"\n";
        }
        });
        // JPY to IDR
        // SGD to IDR
        data.forEach((row1) => {
        const td            = row1.querySelectorAll("td");
        const th            = row1.querySelectorAll("th");
        const mataUang1     = td[1];
        const nilaiKurs     = th[0];
        const mataUang1text = mataUang1.querySelector("a");
        // grab kurs mata uang 
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="SGD") { 
            nilaikursnya += "SGD ➡️ IDR : "+nilaiKurs.innerText+"\n";
        } 
        }); 
        // SGD to IDR
        // EUR to IDR
        data.forEach((row1) => {
        const td            = row1.querySelectorAll("td");
        const th            = row1.querySelectorAll("th");
        const mataUang1     = td[1];
        const nilaiKurs     = th[0];
        const mataUang1text = mataUang1.querySelector("a");
        // grab kurs mata uang 
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="EUR") { 
            nilaikursnya += "EUR ➡️ IDR : "+nilaiKurs.innerText+"\n";
        } 
        }); 
        // EUR to IDR
        // GBP to IDR
        data.forEach((row1) => {
        const td            = row1.querySelectorAll("td");
        const th            = row1.querySelectorAll("th");
        const mataUang1     = td[1];
        const nilaiKurs     = th[0];
        const mataUang1text = mataUang1.querySelector("a");
        // grab kurs mata uang 
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="GBP") { 
            nilaikursnya += "GBP ➡️ IDR : "+nilaiKurs.innerText+"\n";
        } 
        }); 
        // GBP to IDR
        // AUD to IDR
        data.forEach((row1) => {
        const td            = row1.querySelectorAll("td");
        const th            = row1.querySelectorAll("th");
        const mataUang1     = td[1];
        const nilaiKurs     = th[0];
        const mataUang1text = mataUang1.querySelector("a");
        // grab kurs mata uang 
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="AUD") { 
            nilaikursnya += "AUD ➡️ IDR : "+nilaiKurs.innerText+"\n";
        } 
        }); 
        // AUD to IDR
        // SEK to IDR
        data.forEach((row1) => {
        const td            = row1.querySelectorAll("td");
        const th            = row1.querySelectorAll("th");
        const mataUang1     = td[1];
        const nilaiKurs     = th[0];
        const mataUang1text = mataUang1.querySelector("a");
        // grab kurs mata uang 
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="SEK") { 
            nilaikursnya += "SEK  ➡️ IDR : "+nilaiKurs.innerText+"\n";
        } 
        }); 
        // SEK to IDR
        // CNY to IDR
        data.forEach((row1) => {
        const td            = row1.querySelectorAll("td");
        const th            = row1.querySelectorAll("th");
        const mataUang1     = td[1];
        const nilaiKurs     = th[0];
        const mataUang1text = mataUang1.querySelector("a");
        // grab kurs mata uang  
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="CNY") {
            nilaikursnya += "CNY ➡️ IDR : "+nilaiKurs.innerText+"\n";
        }
        }); 
        // CNY to IDR

        data.forEach((row1) => {
            const td            = row1.querySelectorAll("td");
            const th            = row1.querySelectorAll("th");
            const mataUang1     = td[1];
            const nilaiKurs     = th[0];
            const mataUang1text = mataUang1.querySelector("a");
            // Hitung Kurs Lainnya 
            // Deklarasikan kursusdtoidr 
            if(mataUang1text.innerText=="USD") {
                kursmatauangusdtoidrold += nilaiKurs.innerText;
                var kursmatauangusdtoidr0 = nilaiKurs.innerText.replace(",",""); 
                kursmatauangusdtoidr += kursmatauangusdtoidr0.replace(".",""); 
            }
        });
        
        // IDR to USD
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
            nilaikursnya += "IDR   ➡️ USD : "+kursmatauangusdtoidrold+"\n";
        // IDR to USD 
        
        // JPY to USD
        data.forEach((row1) => {
        const td            = row1.querySelectorAll("td");
        const th            = row1.querySelectorAll("th");
        const mataUang1     = td[1];
        const nilaiKurs     = th[0];
        const mataUang1text = mataUang1.querySelector("a");
        // Hitung Kurs Lainnya 
        // kurs jpy to usd = C9/C11*1 
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="JPY") { 
            var kursjpy0 = nilaiKurs.innerText.replaceAll(",","");  
            var kursjpy1 = kursjpy0.replaceAll(".","");   
            var kursjpy2 = ((parseInt(kursmatauangusdtoidr) / parseInt(kursjpy1) * 100)).toFixed(5); 
            nilaikursnya += "JPY  ➡️ USD : "+kursjpy2+"\n";
        }
        });
        // JPY to USD
        // SGD to USD
        data.forEach((row1) => {
        const td            = row1.querySelectorAll("td");
        const th            = row1.querySelectorAll("th");
        const mataUang1     = td[1];
        const nilaiKurs     = th[0];
        const mataUang1text = mataUang1.querySelector("a");
        // Hitung Kurs Lainnya 
        // kurs sgd to usd = C9/C11*1
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="SGD") { 
            var kurssgd0 = nilaiKurs.innerText.replaceAll(",",""); 
            var kurssgd1 = kurssgd0.replaceAll(".","");  
            var kurssgd2 = (parseInt(kursmatauangusdtoidr) / parseInt(kurssgd1)).toFixed(5);
            nilaikursnya += "SGD ➡️ USD : "+kurssgd2+"\n";
        }
        });
        // SGD to USD
        // EUR to USD
        data.forEach((row1) => {
        const td            = row1.querySelectorAll("td");
        const th            = row1.querySelectorAll("th");
        const mataUang1     = td[1];
        const nilaiKurs     = th[0];
        const mataUang1text = mataUang1.querySelector("a");
        // Hitung Kurs Lainnya 
        // kurs eur to usd = C12/C9
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="EUR") {
            var kurseur0 = nilaiKurs.innerText.replaceAll(",","");
            var kurseur1 = kurseur0.replaceAll(".",""); 
            var kurseur2 = (parseInt(kurseur1) / parseInt(kursmatauangusdtoidr)).toFixed(5);
            nilaikursnya += "EUR ➡️ USD : "+kurseur2+"\n";
        }
        });
        // EUR to USD
        // GBP to USD
        data.forEach((row1) => {
        const td            = row1.querySelectorAll("td");
        const th            = row1.querySelectorAll("th");
        const mataUang1     = td[1];
        const nilaiKurs     = th[0];
        const mataUang1text = mataUang1.querySelector("a");
        // Hitung Kurs Lainnya
        // kurs gbp to usd = C13/C9
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="GBP") { 
            var kursgbp0 = nilaiKurs.innerText.replaceAll(",",""); 
            var kursgbp1 = kursgbp0.replaceAll(".",""); 
            var kursgbp2 = (parseInt(kursgbp1) / parseInt(kursmatauangusdtoidr)).toFixed(5); 
            nilaikursnya += "GBP ➡️ USD : "+kursgbp2+"\n";
        }
        });
        // GBP to USD
        // AUD to USD
        data.forEach((row1) => {
        const td            = row1.querySelectorAll("td");
        const th            = row1.querySelectorAll("th");
        const mataUang1     = td[1];
        const nilaiKurs     = th[0];
        const mataUang1text = mataUang1.querySelector("a");
        // Hitung Kurs Lainnya
        // kurs aud to usd = C12/C9
        // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        if(mataUang1text.innerText=="AUD") {
            var kursaud0 = nilaiKurs.innerText.replaceAll(",","");
            var kursaud1 = kursaud0.replaceAll(".",""); 
            var kursaud2 = (parseInt(kursmatauangusdtoidr) / parseInt(kursaud1)).toFixed(5);
            nilaikursnya += "AUD ➡️ USD : "+kursaud2; 
        }
        });
        // AUD to USD
        // SEK to USD
        // data.forEach((row1) => {
        //   const td            = row1.querySelectorAll("td");
        //   const th            = row1.querySelectorAll("th");
        //   const mataUang1     = td[1];
        //   const nilaiKurs     = th[0];
        //   const mataUang1text = mataUang1.querySelector("a");
        //   // Hitung Kurs Lainnya
        //   // kurs sek to usd = C12/C9
        //   // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        //   if(mataUang1text.innerText=="SEK") {
        //     var kurssek0 = nilaiKurs.innerText.replaceAll(",","");
        //     var kurssek1 = kurssek0.replaceAll(".","");
        //     var kurssek2 = (parseInt(kursmatauangusdtoidr) / parseInt(kurssek1)).toFixed(5); 
            // nilaikursnya += "SEK ➡️ usd : "+nilaiKurs.innerText+"\n";
        //   }
        // });
        // SEK to USD
        // CNY to USD
        // data.forEach((row1) => {
        //   const td            = row1.querySelectorAll("td");
        //   const th            = row1.querySelectorAll("th");
        //   const mataUang1     = td[1];
        //   const nilaiKurs     = th[0];
        //   const mataUang1text = mataUang1.querySelector("a");
        //   // Hitung Kurs Lainnya
        //   // kurs cny to usd = C12/C9
        //   // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
        //   if(mataUang1text.innerText=="CNY") {
        //     var kurscny0 = nilaiKurs.innerText.replaceAll(",","");
        //     var kurscny1 = kurscny0.replaceAll(".",""); 
        //     var kurscny2 = (parseInt(kursmatauangusdtoidr) / parseInt(kurscny1)).toFixed(5);
            // nilaikursnya += "CNY ➡️ usd : "+nilaiKurs.innerText+"\n";
        //   }
        // });
        // CNY to USD
        return nilaikursnya;
    });  
    // End Cek Kurs Pajak  


    // Konversi WaktuKursMataUang
    var pecahwaktukursmatauang = waktukursmatauang.split("."); 
    var tanggal1 = pecahwaktukursmatauang[0]; 
    var bulan1 = pecahwaktukursmatauang[1]; 
    if(bulan1=="01") {var bulannew1 = "Januari";}
    else if(bulan1=="02") {var bulannew1 = "Februari";}
    else if(bulan1=="03") {var bulannew1 = "Maret";} 
    else if(bulan1=="04") {var bulannew1 = "April";}
    else if(bulan1=="05") {var bulannew1 = "Mei";}
    else if(bulan1=="06") {var bulannew1 = "Juni";}
    else if(bulan1=="07") {var bulannew1 = "Juli";}
    else if(bulan1=="08") {var bulannew1 = "Agustus";}
    else if(bulan1=="09") {var bulannew1 = "September";}
    else if(bulan1=="10") {var bulannew1 = "Oktober";}
    else if(bulan1=="11") {var bulannew1 = "November";}
    else if(bulan1=="12") {var bulannew1 = "Desember";}
    else {var bulannew1="";}
    var tahun1 = pecahwaktukursmatauang[2]; 
    var waktukursmatauangnew = tanggal1 +" "+ bulannew1 +" "+ tahun1;
    // Konversi WaktuKursMataUang
    // Konversi WaktuKursPajak
    var pecahwaktukurspajak = waktukurspajak.split("."); 
    var tanggal1 = pecahwaktukurspajak[0]; 
    var bulan1 = pecahwaktukurspajak[1]; 
    if(bulan1=="01") {var bulannew1 = "Januari";}
    else if(bulan1=="02") {var bulannew1 = "Februari";}
    else if(bulan1=="03") {var bulannew1 = "Maret";}
    else if(bulan1=="04") {var bulannew1 = "April";}
    else if(bulan1=="05") {var bulannew1 = "Mei";}
    else if(bulan1=="06") {var bulannew1 = "Juni";}
    else if(bulan1=="07") {var bulannew1 = "Juli";}
    else if(bulan1=="08") {var bulannew1 = "Agustus";}
    else if(bulan1=="09") {var bulannew1 = "September";}
    else if(bulan1=="10") {var bulannew1 = "Oktober";}
    else if(bulan1=="11") {var bulannew1 = "November";}
    else if(bulan1=="12") {var bulannew1 = "Desember";}
    else {var bulannew1="";}
    var tahun1 = pecahwaktukurspajak[2]; 
    var waktukurspajaknew = tanggal1 +" "+ bulannew1 +" "+ tahun1;
    // Konversi WaktuKursPajak

    // var outputnya = tdheader1 + tdheader + cekkurspajak;
    fs.appendFile('/files/kursforwhatsapp.txt', 'berhasil', function (err) {
      if (err) throw err; 
      console.log("*Kurs Mata Uang*");   
      console.log("Diperbarui " + waktukursmatauangnew + "\n");
      console.log(tdheader1 + tdheader);  
      console.log("*Kurs Pajak*");
      console.log("Diperbarui " + waktukurspajaknew + "\n");
      console.log(cekkurspajak);
      sleep(2000);
      process.exit(1);
    });

})();   
