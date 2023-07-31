const puppeteer = require("puppeteer");     
const path = require('path');     
const express = require('express');              
const app = express();     
const sleep = require('util').promisify(setTimeout);  
const fetch = require('node-fetch');                
const fs = require('fs');
const { exec, spawn } = require("child_process");     

(async () => {
  exec(`rm /files/kurspajak.txt`, function(err, stdout, stderr) {});     
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
  var logdatenow = yearnow+'-'+monthnow2+'-'+datenow;
  var logtimenow = hh+':'+mm+':'+ss;    
  var datenowlengkap5 = datenow+'.'+monthnow2+'.'+yearnow;

  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],   
    timeout: 10000, 
  });
  const page = await browser.newPage();    
  page.setViewport({width: 1366, height: 768});     

  await page.goto("https://datacenter.ortax.org/ortax/kursmk/list");  
  console.log("Kurs Mata Uang Pajak Indonesia \n"); 
  const tdheader = await page.evaluate((logdatenow, logtimenow, datenowlengkap5) => { 
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
      // Format: EcxRate;Date;IndirQuot;RatioFrom;From;DirQuot;RatioTo;To;
      if(mataUang1text.innerText=="USD") { 
        nilaikursnya += "T;"+datenowlengkap5+";;1;"+mataUang1text.innerText+";"+nilaiKurs.innerText.replace(",","")+";1000;IDR;"+logdatenow+";"+logtimenow+";\n";
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
        nilaikursnya += "T;"+datenowlengkap5+";;1;"+mataUang1text.innerText+";"+kursjpy.replace(",","")+";1;IDR;"+logdatenow+";"+logtimenow+";\n";
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
        nilaikursnya += "T;"+datenowlengkap5+";;1;"+mataUang1text.innerText+";"+nilaiKurs.innerText.replace(",","")+";1000;IDR;"+logdatenow+";"+logtimenow+";\n";
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
        nilaikursnya += "T;"+datenowlengkap5+";;1;"+mataUang1text.innerText+";"+nilaiKurs.innerText.replace(",","")+";1000;IDR;"+logdatenow+";"+logtimenow+";\n";
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
        nilaikursnya += "T;"+datenowlengkap5+";;1;"+mataUang1text.innerText+";"+nilaiKurs.innerText.replace(",","")+";1000;IDR;"+logdatenow+";"+logtimenow+";\n"; 
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
        nilaikursnya += "T;"+datenowlengkap5+";;1;"+mataUang1text.innerText+";"+nilaiKurs.innerText.replace(",","")+";1000;IDR;"+logdatenow+";"+logtimenow+";\n"; 
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
        nilaikursnya += "T;"+datenowlengkap5+";;1;"+mataUang1text.innerText+";"+nilaiKurs.innerText.replace(",","")+";1000;IDR;"+logdatenow+";"+logtimenow+";\n"; 
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
        nilaikursnya += "T;"+datenowlengkap5+";;1;"+mataUang1text.innerText+";"+nilaiKurs.innerText.replace(",","")+";1000;IDR;"+logdatenow+";"+logtimenow+";\n";
      }
    }); 
    // CNY to IDR

    // nilaikursnya += "\n\n"

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
    nilaikursnya += "T;"+datenowlengkap5+";"+kursmatauangusdtoidrold.replace(",","")+";1000;IDR;;1;USD;"+logdatenow+";"+logtimenow+";\n";
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
        nilaikursnya += "T;"+datenowlengkap5+";"+kursjpy2+";1;"+mataUang1text.innerText+";;1;USD;"+logdatenow+";"+logtimenow+";\n";
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
        nilaikursnya += "T;"+datenowlengkap5+";"+kurssgd2+";1;"+mataUang1text.innerText+";;1;USD;"+logdatenow+";"+logtimenow+";\n";
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
        nilaikursnya += "T;"+datenowlengkap5+";;1;"+mataUang1text.innerText+";"+kurseur2+";1;USD;"+logdatenow+";"+logtimenow+";\n"; 
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
        nilaikursnya += "T;"+datenowlengkap5+";;1;"+mataUang1text.innerText+";"+kursgbp2+";1;USD;"+logdatenow+";"+logtimenow+";\n";
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
        nilaikursnya += "T;"+datenowlengkap5+";;1;"+mataUang1text.innerText+";"+kursaud2+";1;USD;"+logdatenow+";"+logtimenow+";\n";
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
    //     nilaikursnya += "T;"+datenowlengkap5+";"+kurssek2+";1;"+mataUang1text.innerText+";;1;USD;"+logdatenow+";"+logtimenow+";\n";
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
    //     nilaikursnya += "T;"+datenowlengkap5+";"+kurscny2+";1;"+mataUang1text.innerText+";;1;USD;"+logdatenow+";"+logtimenow+";\n";
    //   }
    // });
    // CNY to USD
    return nilaikursnya;
  }, logdatenow, logtimenow, datenowlengkap5);

  fs.appendFile('/files/kurspajak.txt', tdheader, function (err) {
    if (err) throw err;  
    console.log('File Kurs Saved!');  
    sleep(5000); 
    process.exit(1);
  });
      
})();   