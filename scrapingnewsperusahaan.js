const path = require('path'); 
const puppeteer = require('puppeteer');   
const sleep = require('util').promisify(setTimeout);     
async function startBrowser() {   
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'], 
    timeout: 10000,
  });
  const page = await browser.newPage(); 
  return {browser, page};
}
async function playTest(url) {
  const {browser, page} = await startBrowser(); 
  page.setViewport({width: 1366, height: 768});
  await page.goto(url);             
  await sleep(2000);                     
  var dataa = ""; 
  const post_title = await page.evaluate(() => {       
    const posttitle = document.querySelector(".post_title");       
    return posttitle.innerHTML;                 
  });   
  dataa += post_title+"|pisah|";
  const post_date = await page.evaluate(() => {       
    const postdate = document.querySelector(".post_date");       
    return postdate.innerHTML;             
  });   
  dataa += post_date+"|pisah|"; 
  const post_link = await page.evaluate(() => {       
    const postlink = document.querySelector(".post_link");       
    return postlink.innerHTML;               
  }); 
  dataa += post_link+"|pisah|";   
  const post_thumbnail = await page.evaluate(() => {        
    const postthumbnail = document.querySelector(".post_thumbnail");       
    return postthumbnail.innerHTML;             
  }); 
  dataa += post_thumbnail+"|pisah|";
  const post_content = await page.evaluate(() => {        
    const postcontent = document.querySelector(".post_content");       
    return postcontent.innerHTML;             
  }); 
  dataa += post_content+"|pisah|";
  console.log(dataa);   
}
(async () => {           
  await playTest("https://domainweb.com/scrapingnewsperusahaan.php");               
  process.exit(1);        
})();   