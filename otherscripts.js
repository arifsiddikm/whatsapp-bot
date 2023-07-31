const puppeteer = require("puppeteer");     
const path = require('path');     
const express = require('express');              
const app = express();    
const sleep = require('util').promisify(setTimeout);  
const fetch = require('node-fetch');                
const fs = require('fs');     
const { exec, spawn } = require("child_process");   

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
if(lastmonth < 10) { var lastmonth = "0"+lastmonth0;}   
else {var lastmonth = lastmonth0;}           
if(monthnow < 10) { var monthnow2 = "0"+monthnow;}        
else {var monthnow2 = monthnow;}
var datenowlengkap1 = yearnow+'-'+monthnow2+'-'+datenow;       
var datenowlengkap2 = yearnow+'-'+monthnow2+'-'+datenow+'-'+hh;      
var datenowlengkap3 = yearnow+'-'+monthnow2+'-'+datenow+'-'+hh+'-'+mm;      

app.use(express.static(path.join(__dirname, '', 'public')));  

// print cv
app.get('/printcv/:nama/:nik/:waktu', async (req, res) => {            
  var nama = req.params.nama;               
  var nik = req.params.nik;   
  var waktu = req.params.waktu;     
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'], 
    timeout: 10000,
  });         
  const page = await browser.newPage();      
  await page.setViewport({ width: 1680, height: 1050 });       
  await page.goto("https://domain.com/printcvkaryawan.php?nik="+nik+"", {  
    waitUntil: "networkidle2"
  });   
  const todays_date = new Date();       
  const pdfURL = path.join(__dirname, 'files/cv', 'CV_'+nama+'_'+waktu+'.pdf');  
  await page.addStyleTag({  
    content: `
    body { border: 1px solid #fff }
    `
  }); 
  const pdf = await page.pdf({
    path: pdfURL,
    format: "A4",
    printBackground: true, 
    displayHeaderFooter: true,  
    headerTemplate: `<div style="font-size:7px;white-space:nowrap;margin-left:38px;"> 
        <span style="margin-left: 10px;"></span>
    </div>`, 
    footerTemplate: `<div style="font-size:7px;white-space:nowrap;margin-left:38px;width:100%;"> 
        <span style="display:inline-block;float:right;margin-right:10px;">
            <span class="pageNumber"></span> / <span class="totalPages"></span>
        </span>
    </div>`,
    margin: {
      top: '38px',
      right: '38px',
      bottom: '38px',
      left: '38px'
    }
  }); 
  await browser.close();
  res.set({
    "Content-Type": "application/pdf",
    "Content-Length": pdf.length
  });
  res.sendFile(pdfURL);
});   
// print monitoring billing
app.get('/monitoringbilling/:waktu', async (req, res) => {               
  var waktu = req.params.waktu;               
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'], 
    timeout: 10000,
  });         
  const page = await browser.newPage();    
  await page.goto("https://domain.com/monitoringbilling.php", {  
    waitUntil: "networkidle2"
  });     
  await page.setViewport({ width: 1680, height: 1050 });         
  const todays_date = new Date();       
  const pdfURL = path.join(__dirname, 'files/mb', 'Monitoring Billing '+waktu+'.pdf');   
  await page.addStyleTag({  
    content: `
    body { border: 1px solid #fff }
    `
  }); 
  const pdf = await page.pdf({
    path: pdfURL,
    format: "A4",
    printBackground: true, 
    displayHeaderFooter: true,  
    headerTemplate: `<div style="font-size:7px;white-space:nowrap;margin-left:38px;"> 
        ${new Date().toDateString()}
        <span style="margin-left: 10px;">Monitoring Billing</span>
    </div>`, 
    footerTemplate: `<div style="font-size:7px;white-space:nowrap;margin-left:38px;width:100%;"> 
        Monitoring Billing
        <span style="display:inline-block;float:right;margin-right:10px;">
            <span class="pageNumber"></span> / <span class="totalPages"></span>
        </span>
    </div>`,
    margin: {
      top: '38px',
      right: '38px',
      bottom: '38px',
      left: '38px'
    }
  });
  await browser.close();
  res.set({
    "Content-Type": "application/pdf",
    "Content-Length": pdf.length
  });
  res.sendFile(pdfURL);
});
// print slipgaji
app.get('/slipgaji/:nama/:nik/:month/:waktu', async (req, res) => {          
  var nama = req.params.nama;               
  var nik = req.params.nik;          
  var month = req.params.month;      
  var waktu = req.params.waktu;         
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],  
    timeout: 10000, 
  });
  const page = await browser.newPage();      
  await page.goto("https://domain.com/printslipgaji.php?nik="+nik+"&month="+month, {  
    waitUntil: "networkidle2"
  }); 
  await page.setViewport({ width: 1680, height: 1050 });  
  const todays_date = new Date();     
  const pdfURL = path.join(__dirname, 'files/slip', 'SlipGaji_'+nama+'_'+month+'_'+waktu+'.pdf'); 
  await page.addStyleTag({ 
    content: `
    body { border: 1px solid #fff }
    `
  }); 
  const pdf = await page.pdf({
    path: pdfURL,
    format: "A4",
    printBackground: true,
    displayHeaderFooter: true, 
    headerTemplate: `<div style="font-size:7px;white-space:nowrap;margin-left:38px;"> 
        ${new Date().toDateString()}
        <span style="margin-left: 10px;">SlipGaji `+nama+`</span>
    </div>`,
    footerTemplate: `<div style="font-size:7px;white-space:nowrap;margin-left:38px;width:100%;">
        SlipGaji `+nama+`
        <span style="display:inline-block;float:right;margin-right:10px;">
            <span class="pageNumber"></span> / <span class="totalPages"></span>
        </span>
    </div>`,
    margin: {
      top: '38px',
      right: '38px',
      bottom: '38px',
      left: '38px'
    }
  }); 
  await browser.close();
  res.set({
    "Content-Type": "application/pdf",
    "Content-Length": pdf.length
  });
  res.sendFile(pdfURL);
});
// screenshot monitoring billing
app.get('/ssmonitoringbilling/:waktu', async (req, res) => {            
  var waktu = req.params.waktu;           
  if(waktu=="") {   
    var waktu = datenowlengkap1;    
  } 
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],   
    timeout: 10000,
  });
  const page = await browser.newPage();       
  page.setViewport({width: 1366, height: 768});   
  await page.goto("https://domain.com/monitoringbilling.php");                 
  await sleep(3000);        
  await page.screenshot({ path: "files/mb/"+datenowlengkap1+".png", fullPage: true }); 
  process.exit(1);      
}); 

// running server 
app.listen(9000, () => {
  console.log('server started on port 9000');
});   